import logging
import tempfile
import os

from aiogram import Router, F
from aiogram.types import CallbackQuery, Message
from aiogram.fsm.context import FSMContext
from fluentogram import TranslatorRunner

from utils import db, voice_to_text, clear_cache
from keyboards import keyboards as kb

main = Router()
logger = logging.getLogger(__name__)

logging.basicConfig(
    level=logging.INFO,
    format='%(filename)s:%(lineno)d #%(levelname)-8s '
           '[%(asctime)s] - %(name)s - %(message)s')


@main.callback_query(F.data == "main_menu")
async def any_text(callback: CallbackQuery,
                   state: FSMContext,
                   i18n: TranslatorRunner):
                   
    user_id = callback.from_user.id
    clear_cache(user_id)

    await state.finish()
    await callback.message.answer(i18n.main.menu(), reply_markup=kb.main_menu(i18n))


@main.message()
async def any_text(message: Message,
                   i18n: TranslatorRunner):
                   
    user_id = message.from_user.id

    logger.info(f"New Dream by user {user_id}: {message.text[32:]}...")

    await db.create_dream(user_id, message.text)
    await message.answer(i18n.dream.writed(), reply_markup=kb.edit_dream())


@main.message(content_types=['voice'])
async def any_voice(message: Message,
                    i18n: TranslatorRunner):
    
    user_id = message.from_user.id
    file_info = await message.bot.get_file(message.voice.file_id)
    file_path = file_info.file_path
    file = await message.bot.download_file(file_path)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".ogg") as temp_ogg_file:
        temp_ogg_file.write(file.getbuffer())
        temp_ogg_path = temp_ogg_file.name
    
    text = voice_to_text(temp_ogg_path)
    os.remove(temp_ogg_path)

    await db.create_dream(user_id, text)
    await message.answer(i18n.dream.writed(), reply_markup=kb.edit_dream())
