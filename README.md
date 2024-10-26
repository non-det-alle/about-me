# Personal website

Source: <https://github.com/denysvitali/thebestmotherfuckingwebsite>

## Build instructions

In order to build this project, you'll need [Docker](https://docker.com/).

```bash
docker run -ti --rm -p 8080:8080 -v .:/app --name website website
```

Visit <http://localhost:8080> and you'll be able to view the website.

To deploy it, attatch to the container, use `yarn run build` and deploy the contents of the `dist/` directory.
