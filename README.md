# River Status and Log

## Development
Install dependencies
```
yarn install
```

Run
```
yarn dev
```
## Deployment
```
docker build -t falkzach/river-status .
docker run -p 80:3000 -d falkzach/river-status
```
