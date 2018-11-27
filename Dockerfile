FROM ubuntu:18.04

# change mirror
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse" > /etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse" >> /etc/apt/sources.list

RUN cat /etc/apt/sources.list

RUN apt-get update \
    && apt-get upgrade -y

RUN apt-get install -y \
    git-core curl zlib1g-dev build-essential libssl-dev \
    libreadline-dev libyaml-dev libsqlite3-dev libmysqlclient-dev sqlite3 \
    libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties \
    ruby2.2 ruby2.2-dev nodejs

# RUN echo "gem: --no-ri --no-rdoc" > ~/.gemrc && mkdir /app

WORKDIR /app

CMD ["/bin/bash"]
