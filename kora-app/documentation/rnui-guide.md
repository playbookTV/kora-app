# Kora UI Guide (RNUI)

Allowed library: `react-native-ui-lib`.

## Core Philosophy
**"Minimal UI, maximum voice"**

*   Screens usually only confirm what voice has stated.
*   One key number (Safe Spend) dominates the home screen.

## Setup

The Design System is initialized in `app/_layout.tsx` via `constants/design-system.ts`.
This loads our global Colors, Typography, and Spacings.

## Usage

### 1. Basic Components
Always import core components from `react-native-ui-lib` instead of `react-native`.

```typescript
import { View, Text, Button } from 'react-native-ui-lib';

export default function MyComponent() {
  return (
    <View flex center bg-screenBG>
      <Text h1 textDefault>₦5,400</Text>
      <Text body textMuted marginT-s2>Safe Spend Today</Text>
      
      <Button 
        label="Remind Me" 
        backgroundColor={Colors.primary} 
        marginT-s5 
      />
    </View>
  );
}
```

### 2. Colors
Access colors directly via `Colors` object or via modifiers props on View/Text.

*   `bg-primary`, `bg-screenBG`, `bg-success`
*   `textDefault`, `textMuted`, `textInverse`

```typescript
<View bg-error padding-s4>
  <Text textInverse>Critical Alert</Text>
</View>
```

### 3. Typography
Use text presets as boolean props on the `Text` component.

*   `h1`: Huge numbers (Safe Spend)
*   `h2`: Page Titles
*   `body`: Standard text
*   `small`: Metadata / labels

```typescript
<Text h1>₦20,000</Text>
<Text body>8 days to payday</Text>
```

### 4. Spacing & Layout
Use modifiers for layout instead of raw styles where possible.

*   `flex`, `center`, `row`, `spread`
*   `padding-s4` (padding: 16), `marginB-s2` (marginBottom: 8)
*   `br20` (borderRadius: 20)

```typescript
<View row spread padding-page>
  <Text h3>Left Item</Text>
  <Text h3>Right Item</Text>
</View>
```
