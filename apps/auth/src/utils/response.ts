import {Response} from "firebase-functions";
import {ApiResponse} from "../response/ApiResponse";

/**
 * Send Api Result to client.
 * @param {Response<any>} res
 * @param {ApiResponse} response
 */
export function sendMessage(res : Response<any>, response : ApiResponse) {
  res.status(response.status).send(JSON.stringify(response));
}
