# SideNav Component

A clean, minimal side navigation component for React applications.

## Features

- 🎨 Simple teal design with clean aesthetics
- 📑 Nested menu items support
- 🎯 Active item highlighting
- 🔔 Badge support (displayed in parentheses)
- 🎛️ Customizable width
- 🚫 Disabled item states
- 📱 Responsive design (mobile-friendly)

## Usage

### Basic Example

```javascript
import React from 'react';
import { SideNav } from './shared';

function App() {
  const navigationItems = [
    {
      label: 'My letters',
      onClick: (item) => console.log('Clicked:', item.label)
    },
    {
      label: 'Other letters',
      onClick: (item) => console.log('Clicked:', item.label)
    },
    {
      label: 'Settings',
      onClick: (item) => console.log('Clicked:', item.label)
    }
  ];

  return (
    <div>
      <SideNav items={navigationItems} width="280px" />
    </div>
  );
}
```

### Example with Nested Items

```javascript
const navigationItems = [
  {
    label: 'My letters',
    onClick: (item) => console.log('Clicked:', item.label)
  },
  {
    label: 'Administration',
    onClick: (item) => console.log('Clicked:', item.label),
    children: [
      {
        label: 'Admin - Outgoing',
        onClick: (item) => console.log('Clicked:', item.label)
      },
      {
        label: 'Admin - Incoming',
        onClick: (item) => console.log('Clicked:', item.label)
      },
      {
        label: 'Manual queue',
        badge: '2',
        onClick: (item) => console.log('Clicked:', item.label)
      }
    ]
  },
  {
    label: 'Settings',
    onClick: (item) => console.log('Clicked:', item.label)
  }
];

<SideNav items={navigationItems} width="280px" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | Array | `[]` | Array of navigation items |
| `width` | String | `'280px'` | Width of the navigation |

## Item Object Structure

Each item in the `items` array should have the following structure:

```javascript
{
  label: String,      // Required: Display text
  badge: String,      // Optional: Badge text shown in parentheses
  onClick: Function,  // Optional: Click handler function
  disabled: Boolean,  // Optional: Disables the item
  children: Array     // Optional: Array of child items (nested)
}
```

## Nested Menu Items

The component supports nested menu items through the `children` property. Child items are automatically indented and styled appropriately. You can nest up to 3 levels deep.

```javascript
{
  label: 'Parent Item',
  children: [
    { label: 'Child Item 1' },
    { label: 'Child Item 2' }
  ]
}
```

## Badge Display

Badges are displayed in parentheses next to the label, following a minimal design:

```javascript
{
  label: 'Manual queue',
  badge: '2'  // Displays as "Manual queue (2)"
}
```

## Styling

The component features:
- Solid teal background (#4DB5A5)
- White text
- Subtle border between items
- Simple hover effects
- Automatic indentation for nested items

Customize styles by modifying `SideNav.css` or overriding CSS classes.

## CSS Classes

- `.side-nav` - Main container
- `.side-nav-content` - Content wrapper
- `.side-nav-list` - List container
- `.side-nav-item` - Individual menu items
- `.side-nav-item.level-0` - Top-level items
- `.side-nav-item.level-1` - First-level nested items
- `.side-nav-item.level-2` - Second-level nested items
- `.side-nav-item.active` - Active item state
- `.side-nav-item.disabled` - Disabled item state
- `.nav-label` - Item label text
- `.nav-badge` - Badge text

## Responsive Behavior

On screens smaller than 768px, the navigation:
- Slides off-screen by default
- Can be toggled with mobile menu button
- Full-width overlay when visible

## Import Methods

```javascript
// Named import
import { SideNav } from './shared';

// Direct import
import SideNav from './shared/components/SideNav';
```

