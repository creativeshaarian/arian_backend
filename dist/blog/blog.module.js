"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blog_post_entity_1 = require("./entities/blog-post.entity");
const blog_category_entity_1 = require("./entities/blog-category.entity");
const blog_service_1 = require("./blog.service");
const blog_category_service_1 = require("./blog-category.service");
const blog_controller_1 = require("./blog.controller");
const blog_admin_controller_1 = require("./blog-admin.controller");
const media_module_1 = require("../media/media.module");
let BlogModule = class BlogModule {
};
exports.BlogModule = BlogModule;
exports.BlogModule = BlogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([blog_post_entity_1.BlogPost, blog_category_entity_1.BlogCategory]),
            media_module_1.MediaModule,
        ],
        controllers: [blog_controller_1.BlogController, blog_admin_controller_1.BlogAdminController],
        providers: [blog_service_1.BlogService, blog_category_service_1.BlogCategoryService],
        exports: [blog_service_1.BlogService, blog_category_service_1.BlogCategoryService],
    })
], BlogModule);
//# sourceMappingURL=blog.module.js.map