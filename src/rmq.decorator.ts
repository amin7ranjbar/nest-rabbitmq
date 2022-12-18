import {
  RabbitRPC,
  RabbitSubscribe,
  MessageHandlerOptions,
  MessageHandlerErrorBehavior,
} from '@golevelup/nestjs-rabbitmq';
import { DEFAULT_EXCHANGE_NAME } from './rmq.constant';

type MessageOptions = Pick<MessageHandlerOptions, 'queue'> & {
  routingKey?: string | string[];
  exchange?: string;
  timeout?: number;
  headers?: any;
};

export const Rpc = (options: MessageOptions) =>
  RabbitRPC({
    ...options,
    routingKey: options.routingKey || options.queue,
    exchange: options.exchange || DEFAULT_EXCHANGE_NAME,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  });

export const Subscribe = (options: MessageOptions) =>
  RabbitSubscribe({
    ...options,
    routingKey: options.routingKey || options.queue,
    exchange: options.exchange || DEFAULT_EXCHANGE_NAME,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  });
