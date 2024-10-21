# ZenDog Frontend Readme

## Getting Started

`pnpm i`  
`pnpm dev`

## AWS Deployment

```bash
pnpm build
aws s3 sync dist/ s3://zendog.site --profile personal
aws cloudfront create-invalidation --distribution-id E29DD3Q822QBSJ --paths '/*' --profile personal
```
