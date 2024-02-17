# Cards Vocabulary

A self hosted and simple flip-card learning platform, running on Next.js and Stripe.

### Why

I wanted a small flip cards platform that I can enter my own data and learn new Finnish words and sentences. I couldn't find it so I took this chance to learn Next.js and built my own. It's a question-answer kind of platform but it can be used with anything else other than languages, such as math questions.

### How To

- Create a new `.env` file by modifying `.env.example`.

- Run Docker

```bash
# Up
docker-compose -p cards up -d
```

- Go to Strapi and generate your API token. Put it into `.env` file and re-create docker containers.

```bash
#down
docker-compose -p cards down
#up
docker-compose -p cards up -d
```
