import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOptions } from '../../context/OptionsContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTyping } from '../../context/TypingContext';
import translate from '../../utils/translate';
import CompletionScreen from '../utils/CompletionScreen';
import Countdown from '../utils/Countdown';
import TypinginputField from '../keyboard/TypingInputField';
import usePostGameRecord from '../../hooks/usePostGameRecord';

type HideWordsProps = {
    latvianWords: string[];
    userId: string | null;
};

const HideWords: React.FC<HideWordsProps> = ({ latvianWords, userId }) => {
    const TYPING_TIME = 10;
    const INITIAL_SHOW_TIME = 5;
    const MIN_SHOW_TIME = 1;

    const { gameOption } = useParams<{ gameOption: string }>();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { setTime, timeLeft, time } = useOptions();
    const { isTypingFinished } = useTyping();

    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [typingTime, setTypingTime] = useState(TYPING_TIME);
    const [round, setRound] = useState(0);
    const [showText, setShowText] = useState(true);

    const [showTime, setShowTime] = useState(INITIAL_SHOW_TIME);
    const [isGameOver, setIsGameOver] = useState(false);
    const [resetCountdown, setResetCountdown] = useState(false);
    const hasWords = Array.isArray(latvianWords) && latvianWords.length > 0;
    const [currentWord, setCurrentWord] = useState(hasWords ? latvianWords[round] : '');

    const { gameRecordPostError } = usePostGameRecord(gameOption, round, isGameOver, userId);

    const resetRound = useCallback(() => {
        setResetCountdown(true);
        setCurrentWord(hasWords ? latvianWords[round] : '');
        setTypingTime(TYPING_TIME);
        setShowTime(Math.max(MIN_SHOW_TIME, Math.floor(showTime - 0.1)));
    }, [hasWords, latvianWords, round, showTime]);

    const handleKeyPress = useCallback(
        (lastKeyPress: string) => {
            if (isGameOver) return;

            if (lastKeyPress === currentWord[currentLetterIndex]) {
                const nextIndex = currentLetterIndex + 1;

                if (nextIndex === currentWord.length) {
                    setRound((prev) => prev + 1);
                    resetRound();
                } else {
                    setCurrentLetterIndex(nextIndex);
                }
            }
        },
        [currentWord, currentLetterIndex, isGameOver, resetRound]
    );

    useEffect(() => {
        if (hasWords && round >= latvianWords.length) {
            setIsGameOver(true);
        }
    }, [round, hasWords, latvianWords.length]);

    useEffect(() => {
        if (typingTime !== time) {
            setTime(typingTime);
        }
    }, [typingTime, setTime, time]);

    useEffect(() => {
        if (isTypingFinished) {
            setIsGameOver(true);
        }
    }, [isTypingFinished]);

    useEffect(() => {
        if (timeLeft != null) {
            if (timeLeft > showTime) {
                setShowText(true);
            } else {
                setShowText(false);
            }
        }
    }, [showTime, timeLeft]);
    const completionTitle = `${translate('game_over_you_held_up', language)} ${round} ${translate(round === 1 ? 'round' : 'rounds', language)}`;

    if (isGameOver) {
        return (
            <CompletionScreen
                title={completionTitle}
                showMetrics={false}
                error={gameRecordPostError}
                buttons={[
                    {
                        text: 'home',
                        onClick: () => navigate('/'),
                    },
                    {
                        text: 'restart',
                        onClick: () => location.reload(),
                    },
                ]}
            />
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-xl text-center text-color-primary p-4">
                {translate('round', language)} {round}
            </div>
            <Countdown start={!isGameOver} reset={resetCountdown} setReset={setResetCountdown} key={round} />

            {currentWord && showText && (
                <div className="flex justify-center items-center flex-wrap bg-color-third border border-primary p-6 min-w-[44rem] max-w-[44rem] gap-1">
                    <span className="flex flex-row justify-center items-center gap-1">
                        <span className="text-color-typing text-2xl">{currentWord}</span>
                    </span>
                </div>
            )}

            <TypinginputField
                onKeyPress={handleKeyPress}
                isTypingFinished={isGameOver}
                labelText="type_word_that_shows_above"
            />
        </div>
    );
};

export default HideWords;