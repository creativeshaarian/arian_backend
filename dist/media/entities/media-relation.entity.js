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
exports.MediaRelation = void 0;
const typeorm_1 = require("typeorm");
const media_asset_entity_1 = require("../../media/entities/media-asset.entity");
let MediaRelation = class MediaRelation {
};
exports.MediaRelation = MediaRelation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MediaRelation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 36, name: 'media_id' }),
    __metadata("design:type", String)
], MediaRelation.prototype, "mediaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => media_asset_entity_1.MediaAsset, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'media_id' }),
    __metadata("design:type", media_asset_entity_1.MediaAsset)
], MediaRelation.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32, name: 'entity_type' }),
    __metadata("design:type", String)
], MediaRelation.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 36, name: 'entity_id' }),
    __metadata("design:type", String)
], MediaRelation.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32 }),
    __metadata("design:type", String)
], MediaRelation.prototype, "field", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, name: 'sort_order' }),
    __metadata("design:type", Number)
], MediaRelation.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], MediaRelation.prototype, "createdAt", void 0);
exports.MediaRelation = MediaRelation = __decorate([
    (0, typeorm_1.Entity)('media_relations'),
    (0, typeorm_1.Index)(['entityType', 'entityId', 'field'])
], MediaRelation);
//# sourceMappingURL=media-relation.entity.js.map