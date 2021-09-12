"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let UsersService = class UsersService {
    constructor(elasticsearchService) {
        this.elasticsearchService = elasticsearchService;
        this.elasticIndex = 'users';
    }
    async create(user) {
        const result = await this.elasticsearchService.index({
            index: this.elasticIndex,
            body: user
        });
        return this.findById(result.body._id);
    }
    async findById(id) {
        const response = await this.elasticsearchService.get({
            id,
            index: this.elasticIndex
        });
        return Object.assign({ id }, response.body._source);
    }
    async find(filter) {
        const params = { index: this.elasticIndex };
        if (Object.keys(filter).length) {
            Object.assign(params, {
                body: {
                    query: {
                        match: filter
                    }
                }
            });
        }
        const response = await this.elasticsearchService.search(params);
        const result = response.body.hits.hits.map(item => (Object.assign(Object.assign({}, item._source), { id: item._id })));
        return result;
    }
    async update(id, data) {
        await this.elasticsearchService.update({
            id,
            index: this.elasticIndex,
            body: {
                doc: data
            }
        });
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.elasticsearchService.delete({
            id,
            index: this.elasticIndex
        });
        return 'ok';
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map