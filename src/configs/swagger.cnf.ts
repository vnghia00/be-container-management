import { DocumentBuilder, SwaggerCustomOptions } from "@nestjs/swagger";

const swaggerConfig = new DocumentBuilder()
    .setTitle('Container dashboard API docs')
    .setDescription('The Container dashboard API description')
    .setExternalDoc('Postman Collection', '/api-docs-json')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

const swaggerOption: SwaggerCustomOptions = {
    customSiteTitle: 'Container dashboard API Docs',
}
export { swaggerConfig, swaggerOption }
