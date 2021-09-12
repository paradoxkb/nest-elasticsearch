"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NRabbitMqConfig = void 0;
const configs_1 = require("../configs");
var NRabbitMqConfig;
(function (NRabbitMqConfig) {
    NRabbitMqConfig.usersBus = {
        routingKey: 'users',
        exchange: 'users-exchange',
        queue: 'users-queue',
        type: 'subscribe'
    };
    NRabbitMqConfig.mainConfig = {
        uri: configs_1.default.rabbitMqUrl,
        exchanges: [
            {
                name: NRabbitMqConfig.usersBus.exchange,
                type: 'topic'
            }
        ]
    };
})(NRabbitMqConfig = exports.NRabbitMqConfig || (exports.NRabbitMqConfig = {}));
//# sourceMappingURL=rabbitmq.js.map