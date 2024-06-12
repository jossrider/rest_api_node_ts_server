import swaggerJSDoc from 'swagger-jsdoc'
import { SwaggerUiOptions } from 'swagger-ui-express'

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [{ name: 'Products', description: 'API operations related to products' }],
    info: {
      title: 'REST API Node.js / EXPRESS / TypeScript',
      version: '1.0',
      description: 'API Docs for for Products',
    },
  },
  apis: ['./src/router.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
  // content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
  customCss: `.topbar-wrapper .link{
    content: url('Logo personalizado aqui');
    height:80px;
    width:auto;
    }
    .swagger-ui .topbar{
      background-color: #2b3b45;
      }
      `,
  customSiteTitle: 'Documentacion REST API Express / TypeScript',
}

export default swaggerSpec
export { swaggerUiOptions }
