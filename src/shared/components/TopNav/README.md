# TopNav Component

A clean, minimal top navigation bar component for React applications.

## Features

- 🎨 Clean design with dark blue background
- 📱 Fully responsive (mobile-friendly)
- 🟥 Customizable red logo section
- ❓ Help button on the right
- 🎛️ Customizable height and colors
- ♿ Accessibility support

## Usage

### Basic Example

```javascript
import React from 'react';
import { TopNav } from './shared';

function App() {
  return (
    <TopNav
      title="Letter management"
      logoColor="#A63446"
      onHelpClick={() => console.log('Help clicked')}
      height="50px"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | String | `'Letter management'` | Application title displayed in the nav |
| `logoColor` | String | `'#A63446'` | Background color of the logo section |
| `onHelpClick` | Function | - | Callback function when help button is clicked |
| `height` | String | `'50px'` | Height of the navigation bar |

## Custom Logo Color

You can customize the logo section color:

```javascript
<TopNav
  title="My Application"
  logoColor="#FF5733"  // Custom red-orange color
  onHelpClick={() => alert('Help!')}
/>
```

## Styling

The component features:
- Dark blue background (#3D4E5C)
- Red logo section (#A63446)
- White help button with hover effect
- Clean, minimal design
- Responsive behavior

Customize by modifying `TopNav.css` or overriding CSS classes.

## CSS Classes

- `.top-nav` - Main container
- `.top-nav-left` - Left section (logo, title)
- `.top-nav-logo` - Logo section
- `.top-nav-title` - Title text
- `.top-nav-right` - Right section (help button)
- `.help-btn` - Help button

## Responsive Behavior

**Mobile (< 768px):**
- Logo section width reduced to 150px
- Smaller title font
- Smaller help button

**Small Mobile (< 480px):**
- Logo section width reduced to 100px
- Minimal spacing for compact view

## Accessibility

The component includes:
- `aria-label` attributes
- Semantic HTML structure
- Keyboard navigation support
- Focus management

## Integration with SideNav

Perfect for use with the SideNav component. Both components have matching design aesthetics and work seamlessly together:

```javascript
<TopNav
  title="Letter management"
  logoColor="#A63446"
  onHelpClick={() => console.log('Help')}
/>
<SideNav
  items={navigationItems}
  width="280px"
/>
```

## Import Methods

```javascript
// Named import
import { TopNav } from './shared';

// Direct import
import TopNav from './shared/components/TopNav';
```

