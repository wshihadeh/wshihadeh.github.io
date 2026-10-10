FROM python:3.12-alpine

ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.local/bin

COPY requirements.txt /mkdocs/
WORKDIR /mkdocs
VOLUME /mkdocs

RUN pip install --no-cache-dir -r requirements.txt
