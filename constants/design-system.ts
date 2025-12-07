import { Colors, Typography, Spacings } from 'react-native-ui-lib';

// Kora Design System
// Based on "Minimal UI, maximum voice" philosophy.

// 1. Colors
Colors.loadColors({
    primary: '#1E1E1E', // Dark/Black for high contrast elements
    secondary: '#5A5A5A', // Secondary text/elements

    // Backgrounds
    screenBG: '#FFFFFF',

    // Status Colors
    success: '#4CAF50', // Green for safe spend / under budget
    warning: '#FFC107', // Yellow for caution
    error: '#F44336',   // Red for over budget / danger

    // Text
    textDefault: '#1E1E1E',
    textMuted: '#9E9E9E',
    textInverse: '#FFFFFF',
});

// 2. Typography
Typography.loadTypographies({
    h1: { fontSize: 48, fontWeight: '700', lineHeight: 56 }, // Safe Spend Number
    h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 }, // Section Headers
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 }, // Sub-headers
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 }, // Standard text
    small: { fontSize: 12, fontWeight: '400', lineHeight: 16 }, // Helper text / metadata
});

// 3. Spacings
Spacings.loadSpacings({
    page: 20,
    card: 16,
    s1: 4,
    s2: 8,
    s3: 12,
    s4: 16,
    s5: 20,
    s6: 24,
    s8: 32,
    s10: 40,
});
