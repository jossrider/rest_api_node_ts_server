import swaggerJSDoc from 'swagger-jsdoc'

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

export default swaggerSpec
