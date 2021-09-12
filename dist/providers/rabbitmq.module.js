"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQMessageModule = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const rabbitmq_1 = require("../configs/rabbitmq");
let RabbitMQMessageModule = class RabbitMQMessageModule {
};
RabbitMQMessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_rabbitmq_1.RabbitMQModule.forRoot(nestjs_rabbitmq_1.RabbitMQModule, rabbitmq_1.NRabbitMqConfig.mainConfig)
        ],
        providers: [],
        exports: [nestjs_rabbitmq_1.RabbitMQModule]
    })
], RabbitMQMessageModule);
exports.RabbitMQMessageModule = RabbitMQMessageModule;
//# sourceMappingURL=rabbitmq.module.js.map