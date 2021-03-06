"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const app_service_1 = require("./app.service");
const users_resolver_1 = require("./users/users.resolver");
const users_module_1 = require("./users/users.module");
const rabbitmq_module_1 = require("./providers/rabbitmq.module");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const microservices_1 = require("@nestjs/microservices");
const elasticsearch_module_1 = require("./providers/elasticsearch.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                typePaths: ['./**/*.graphql'],
                definitions: {
                    path: (0, path_1.join)(process.cwd(), 'src/graphql.ts'),
                    outputAs: 'class'
                },
                introspection: true,
                playground: true,
                context: ({ req }) => ({ req })
            }),
            users_module_1.UsersModule,
            elasticsearch_module_1.ElasticsearchLocalModule,
            rabbitmq_module_1.RabbitMQMessageModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'Nest_App',
                    transport: microservices_1.Transport.TCP,
                    options: { port: 5672 },
                },
            ])
        ],
        providers: [app_service_1.AppService, users_resolver_1.UsersResolver, nestjs_rabbitmq_1.AmqpConnection]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map