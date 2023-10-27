import {logger} from "firebase-functions/v1";
import {MemberProfile} from "../domain/UserProfile";
import {OAuth2Client} from "./OAuth2Client";
import axios from "axios";
import {randomUUID} from "crypto";


/**
 * KakaoOAuth2Client, it provides Kakao oauth2 request and
 * MemberProfile for firebase.
 */
export class KakaoOAuth2Client extends OAuth2Client {
  /**
   * request to Kakao api server to get user information.
   * @param {string} accessToken Access token that provided by Kakao
   * @return {Axios.response}
   */
  protected request(accessToken : string) {
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    };

    const data = {
      property_keys: [
        "kakao_account.name",
        "kakao_account.email",
      ],
    };

    return axios.post(this.url, data, {
      headers: headers,
    });
  }

  /**
   * Convert Kakao API Response to MemberProfile
   * @param {any} response REST API response
   * @return {MemberProfile}
   */
  protected convertMemberProfile(response : any) : MemberProfile {
    logger.debug("KakaoOAuth2Client start convert Member Profile.");
    // logger.debug(`converted body : ${JSON.stringify(body)}`)
    const body = response.data;
    logger.debug("KakaoOAuth2Client body : ");
    logger.debug(body);
    const userId = `kakao:${body.id}`;

    if (!userId) {
      throw new Error("MEMBER_NOT_FOUND");
    }

    logger.debug("KakaoOAuth2Client user id : ", userId);
    const uuid = randomUUID().toString();
    // TODO Kakao Application 등록 후 삭제
    const memberProfile : MemberProfile = {
      provider: "kakao",
      userId: userId,
      name: `kakao-tester-${uuid}`,
      email: `kakao-tester-${uuid}@bokki.com`,
    };

    return memberProfile;
  }
}
