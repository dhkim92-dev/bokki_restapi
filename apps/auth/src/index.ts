// import {region} from "firebase-functions"
import * as admin from "firebase-admin";
import {logger, region} from "firebase-functions/v1";
import {UserRecord} from "firebase-admin/auth";
import {MemberProfile} from "./domain/UserProfile";
import {OAuth2ClientFactory} from "./services/OAuth2ClientFactory";
import {sendMessage} from "./utils/response";
import {INTERNAL_SERVER_ERROR,
  NOT_SUPPORTED_METHOD,
  NO_ACCESS_TOKEN,
  NO_PLATFORM_PROVIDED,
  NO_USER_FOUND} from "./constants/ErrorCode";
import {CUSTOM_TOKEN_PUBLISHED} from "./constants/SuccessCode";
import * as cors from "cors";

const corsConfig = cors({
  origin: ["http://localhost:3000"],
});

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

/**
 * Create a user on firebase.
 * @param {MemberProfile} memberProfile
 * @return {Promise<UserRecord>}
 */
function upsertMember(memberProfile : MemberProfile) : Promise<UserRecord> {
  logger.debug("upsertMember start.");
  const updateParam = {
    email: memberProfile.email,
    displayName: memberProfile.name,
    provider: memberProfile.provider,
  };

  return admin.auth().updateUser(memberProfile.userId, updateParam)
    .catch((err) => {
      if (err.code === "auth/user-not-found") {
        updateParam["uid"] = memberProfile.userId;
        return admin.auth().createUser(updateParam);
      }
      throw new Error("Unknown");
    });
}

/**
 * Create Firebase Custom token
 * @param {UserRecord} user
 * @param {MemberProfile} profile
 * @return {Promise<string>}
 */
function createCustomToken(user : UserRecord, profile : MemberProfile) {
  return admin.auth()
    .createCustomToken(user.uid, {
      provider: profile.provider,
    });
}

exports.authentication = region("asia-northeast1")
  .https
  .onRequest((req, res) => {
    corsConfig(req, res, () => {
      if (req.method !== "POST") {
        sendMessage(res, NOT_SUPPORTED_METHOD);
        return;
      }

      logger.debug("body : ", JSON.stringify(req.body));
      const provider = req.body.provider;
      const accessToken = req.body.access_token;

      if (!provider) {
        sendMessage(res, NO_PLATFORM_PROVIDED);
        return;
      }

      if (!accessToken) {
        sendMessage(res, NO_ACCESS_TOKEN);
        return;
      }

      new OAuth2ClientFactory().build(provider)
        .authenticate(accessToken)
        .then((memberProfile) => {
          upsertMember(memberProfile)
            .then((userRecord) => {
              createCustomToken(userRecord, memberProfile).then((token) => {
                const response = CUSTOM_TOKEN_PUBLISHED;
                response.payload = {
                  "firebase_token": token,
                };
                sendMessage(res, response);
                return;
              }).catch((err) => {
                logger.error("error occured during createCustomToken.");
                const response = INTERNAL_SERVER_ERROR;
                response.error = err;
                sendMessage(res, response);
                return;
              });
            }).catch((err) => {
              const response = INTERNAL_SERVER_ERROR;
              response.error = err;
              sendMessage(res, response);
              return;
            });
        }).catch((err) => {
          sendMessage(res, NO_USER_FOUND);
          return;
        });
    });
  });
