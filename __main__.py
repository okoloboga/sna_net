import asyncio
import logging

from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from fluentogram import TranslatorHub

from utils import TranslatorHub, create_translator_hub, TranslatorRunnerMiddleware, db_start
from handlers import (account_router, analyze_router, dreams_router, main_router, start_router, 
                      search_router, admin_router)
from config import get_config, BotConfig


logger = logging.getLogger(__name__)

async def main():
    logging.basicConfig(
        level=logging.INFO,
        format='%(filename)s:%(lineno)d #%(levelname)-8s '
               '[%(asctime)s] - %(name)s - %(message)s'
    )
    logger.info('Starting Bot')

    # Init Bot in Dispatcher
    bot_config = get_config(BotConfig, "bot")
    await db_start()
    
    if not bot_config.token:
        logger.error("Bot token is missing in the configuration.")
        return
    
    bot = Bot(token=bot_config.token.get_secret_value(),
              default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    dp = Dispatcher()

    # i18n init
    translator_hub: TranslatorHub = create_translator_hub()

    # Routers, dialogs, middlewares
    dp.include_routers(account_router, analyze_router, dreams_router, main_router, start_router, search_router, admin_router)
    dp.update.middleware(TranslatorRunnerMiddleware())
 
    # Skipping old updates
    await bot.delete_webhook(drop_pending_updates=True)
    logger.info("Webhook deleted, ready for polling.")
    
    await dp.start_polling(bot, _translator_hub=translator_hub)
    return bot

if __name__ == '__main__':
    try:
        asyncio.run(main())
    except Exception as e:
        logger.error(f"Error while starting bot: {e}")
