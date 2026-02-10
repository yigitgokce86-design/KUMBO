import React, { useRef, useState, useEffect } from 'react';
import styles from './PinInput.module.css';
import { clsx } from 'clsx';

interface PinInputProps {
    length?: number;
    onComplete: (pin: string) => void;
    isLoading?: boolean;
}

export const PinInput: React.FC<PinInputProps> = ({ length = 4, onComplete, isLoading }) => {
    const [pin, setPin] = useState<string[]>(new Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (isLoading) return;
        if (!/^\d*$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value.slice(-1); // Take only the last entered digit
        setPin(newPin);

        // Auto-focus next input
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Check completion
        const pinString = newPin.join('');
        if (pinString.length === length && newPin.every(digit => digit !== '')) {
            onComplete(pinString);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isLoading) return;
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            // Focus previous input on backspace if current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className={styles.container}>
            {pin.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }} // Correctly assigning to the mutable ref array
                    type="password"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    className={clsx(styles.input, digit && styles.filled)}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={isLoading}
                />
            ))}
        </div>
    );
};
