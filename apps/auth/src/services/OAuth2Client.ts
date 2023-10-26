import {MemberProfile} from "../domain/UserProfile";
import {logger} from "firebase-functions/v1";

/**
 * OAuth2Client - Abstract class for OAuth2 Authentication service.
 * Developers who want to add new OAuth2 platform
 * should override converMemberProfile(response : any)
 * & requset(accessToken : string) methods.
 */
export abstract class OAuth2Client {
  protected url : string;

  /**
   * Constructor of OAuth2Client
   * @param {string} url URL that should be called.
   */
  constructor(url : string) {
    this.url = url;
  }

  /**
   * Method to get member information.
   * @param {string} accessToken access token provided by OAuth2 providers.
   * @return {Promise<MemberProfile>}
   */
  public async authenticate(accessToken : string) : Promise<MemberProfile> {
    try {
      const response = await this.request(accessToken);
      const memberProfile = this.convertMemberProfile(response);
      logger.debug("OAuth2Client member profile arrived.");
      return memberProfile;
    } catch (error) {
      logger.error("OAuth2Client error occured.");
      throw error;
    }
  }

  protected abstract request(accessToken : string) : any;

  protected abstract convertMemberProfile(response : any) : MemberProfile;
}
