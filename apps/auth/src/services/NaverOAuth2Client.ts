import axios from "axios";
import {MemberProfile} from "../domain/UserProfile";
import {OAuth2Client} from "./OAuth2Client";
import {logger} from "firebase-functions/v1";

/**
 * OAuth2Client implementation for Naver.
 */
export class NaverOAuth2Client extends OAuth2Client {
  /**
   * Send Request to Naver API to get User information.
   * @param {string} accessToken
   * @return {Response<any>}
   */
  protected request(accessToken: string) {
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
    };

    return axios.get(this.url, {
      headers: headers,
    });
  }

  /**
   * Convert User data response from Naver to Application MemberProfile.
   * @param {any} response HTTP Response
   * @return {MemberProfile}
   */
  protected convertMemberProfile(response: any): MemberProfile {
    const body = response.data;
    // logger.debug("NaverOauth2Client body : " + JSON.stringify(body))
    const userData = body.response;
    const userId = `naver:${body.response.id}`;

    if (!userId) {
      // logger.error("NaverOAuth2Client userId is null.");
      throw new Error("MEMBER_NOT_FOUND");
    }

    const memberProfile : MemberProfile = {
      name: userData.name,
      email: userData.email,
      userId: userId,
      provider: "naver",
    };

    return memberProfile;
  }
}
