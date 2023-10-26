import {KakaoOAuth2Client} from "./KakaoOAuth2Client";
import {NaverOAuth2Client} from "./NaverOAuth2Client";
import {OAuth2Client} from "./OAuth2Client";

const KAKAO_URL = "https://kapi.kakao.com/v2/user/me?secure_resource=true";
const NAVER_URL = "https://openapi.naver.com/v1/nid/me";

/**
 * OAuth2ClientFactory
 * It has responsibility to provider correct OAuth2Client for each provider.
 */
export class OAuth2ClientFactory {
  /**
   * Build OAuth2Client instance.
   * @param {string} provider name of OAuth2 provider. only alphabet.
   * @return {OAuth2Client | null}
   */
  build(provider : string) : OAuth2Client | null {
    const platform = provider.toLowerCase();
    if (platform === "kakao") {
      return new KakaoOAuth2Client(KAKAO_URL);
    } else if (platform === "naver") {
      return new NaverOAuth2Client(NAVER_URL);
    }
    // }else if(platform == 'naver') {
    // }else if(platform == 'google') {
    // }
    return null;
  }
}
