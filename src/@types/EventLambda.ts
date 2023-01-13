import { APIGatewayProxyEventV2 } from "aws-lambda";
import { IMiddlewareAttributes } from "../middlewares/IMiddlewareInterface";

export type EventLambda = APIGatewayProxyEventV2 & IMiddlewareAttributes
