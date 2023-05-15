# Daily Incomer

## Технические спецификации

1.**Package manager** - Проект использует **yarn v1.22.19**, так как на данный момент взаимодействие с версиями **berry** и выше все еще в тесте

2.**Development** - Используется локальное развертывание базы данных с помощью **docker compose** и **dev** скрипт для запуска самих приложений одновременно

При работе с БД рекомендуется прочесть документацию [**PrismaORM**](https://www.prisma.io/) - для более гибкой работы с нашей **ORM(Object Relation Model)**.

```bash

yarn db:dev # Запускает Docker контейнер с локальной базой данных

yarn dev # Запускает все приложения монорепозитория. ВАЖНО! Соблюдайте последовательность запуска в оизбежание ошибок из-за отсутствия БД

yarn db:push # Отправляет изменения из `prisma.schema` в базу данных, прогонять каждый раз, когда меняется схема


```

3.**Work Flow** - работаем по стандартном [**GitFlow**](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=What%20is%20Gitflow%3F,lived%20branches%20and%20larger%20commits.).

**main** - ветка для релизов  
**develop** - ветка для разработки, от нее мы создаем ветки для задач  
**feature/**- ветки по конкретным задачам, создаются от **develop**  
**hotfix/\*\*** - ветки с фиксами критичных багов, могут быть созданы прямо от **main**  

По префиксам для коммитов см. комментарии в [**commitlint.config.cjs**](./commitlint.config.cjs).  

## Архитектура проекта

[**./apps**](./apps/) - Приложения монорепозитория  
apps  
├── web # [**Next.js**](https://nextjs.org/docs/) приложение  
│ ├── hooks # Кастомные хуки  
│ ├── pages # [Раутинг](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts) приложения  
│ └── services # Внутренние сервисы  
└── api # [**Nest.js**](https://docs.nestjs.com/) приложение  
├── prisma # Схема [**PrismaORM**](https://www.prisma.io/)  
├── src # [**root**](./apps/api/src/) дирректория всего проекта, здесь хранятся модули nestjs  
└── test # **e2e**(End To End) тесты  

[**./packages**](./packages/) - Внутреннией пакеты и конфигурация монорепозитория  
packages  
├── stylelint-config # [**Stylelint**](https://stylelint.io/) конфигурация  
├── jest-preset # [**Jest**](https://jestjs.io/) конфигурация  
├── shared # Переиспользуемый код между другими пакетами  
├── eslint-config # [**Eslint**](https://eslint.org/) конфигурация  
├── tsconfig # [**Typescript**](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) конфигурации  
└── ui # [**Nest.js**](https://docs.nestjs.com/) приложение  
└── components # [**React**](https://react.dev/) компоненты для работы с [**web**](./apps/web/) приложением  
