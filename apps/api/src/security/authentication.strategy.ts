import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {auth} from "firebase-admin";
import {ExtractJwt, Strategy} from "passport-firebase-jwt";

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(token : string) {
    return auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new UnauthorizedException()
      })
  }
}