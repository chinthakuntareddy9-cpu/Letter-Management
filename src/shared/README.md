# Shared Module

A collection of reusable React components for building modern web applications.

## 📦 Components

### Navigation Components

- **[SideNav](./components/SideNav/README.md)** - Collapsible side navigation with icons, badges, and animations
- **[TopNav](./components/TopNav/README.md)** - Top navigation bar with dropdown menus, search, and action buttons

## 🚀 Getting Started

### Installation

No additional installation required. The shared module is part of your project.

### Import Components

```javascript
// Import from shared module
import { SideNav, TopNav } from './shared';

// Or import individually
import SideNav from './shared/components/SideNav';
import TopNav from './shared/components/TopNav';
```

## 📖 Usage Examples

### Complete Navigation Layout

```javascript
import React, { useState } from 'react';
import { SideNav, TopNav } from './shared';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div className="App">
      {/* Top Navigation */}
      <TopNav
        title="My App"
        logo="🚀"
        menuItems={[
          { label: 'Home', icon: '🏠', active: true },
          { label: 'About', icon: 'ℹ️' }
        ]}
        rightItems={[
          { icon: '🔔', label: 'Notifications', badge: '3' }
        ]}
        showSearch={true}
        onMenuClick={() => setIsNavOpen(!isNavOpen)}
      />

      {/* Side Navigation */}
      <SideNav
        items={[
          { label: 'Dashboard', icon: '📊' },
          { label: 'Settings', icon: '⚙️' }
        ]}
        isOpen={isNavOpen}
        onToggle={() => setIsNavOpen(!isNavOpen)}
      />

      {/* Main Content */}
      <div style={{ 
        marginLeft: isNavOpen ? '250px' : '60px',
        marginTop: '60px',
        transition: 'margin-left 0.3s ease'
      }}>
        <h1>Welcome!</h1>
      </div>
    </div>
  );
}
```

### SideNav Only

```javascript
import { SideNav } from './shared';

<SideNav
  items={[
    { label: 'Dashboard', icon: '📊' },
    { label: 'Profile', icon: '👤', badge: '2' },
    { label: 'Settings', icon: '⚙️' }
  ]}
  isOpen={true}
  onToggle={() => setIsOpen(!isOpen)}
/>
```

### TopNav Only

```javascript
import { TopNav } from './shared';

<TopNav
  title="My Application"
  menuItems={[
    { label: 'Home', icon: '🏠' },
    { label: 'Products', icon: '📦' }
  ]}
  rightItems={[
    { icon: '👤', label: 'Profile' }
  ]}
  showSearch={true}
/>
```

## 🎨 Design Features

### Consistent Styling
- Purple gradient theme across components
- Smooth animations and transitions
- Modern, clean design
- Hover effects and visual feedback

### Responsive Design
- Mobile-friendly layouts
- Adaptive spacing
- Touch-optimized interactions
- Breakpoints for different screen sizes

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- Semantic HTML structure
- Focus management

## 🔧 Customization

### Theme Customization

You can customize the color scheme by modifying the CSS gradient:

```css
/* Change the purple gradient to your brand colors */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### Component Props

Each component accepts various props for customization:
- **SideNav**: width, items, isOpen, onToggle
- **TopNav**: title, logo, height, menuItems, rightItems, showSearch

See individual component READMEs for complete prop documentation.

## 📱 Responsive Breakpoints

- **Desktop**: > 768px - Full layout with all features
- **Tablet**: 768px - 480px - Compact layout
- **Mobile**: < 480px - Minimal layout with hidden elements

## 🎯 Best Practices

1. **State Management**: Keep navigation state in parent component
2. **Consistent Icons**: Use the same icon style throughout (emojis, SVGs, or icon libraries)
3. **Badge Usage**: Use badges for important notifications only
4. **Click Handlers**: Always provide onClick handlers for interactive items
5. **Accessibility**: Include descriptive labels for all interactive elements

## 🏗️ Project Structure

```
shared/
├── index.js                      # Main export file
├── README.md                     # This file
└── components/
    ├── index.js                  # Component exports
    ├── SideNav/
    │   ├── SideNav.js           # Component logic
    │   ├── SideNav.css          # Component styles
    │   ├── index.js             # Component export
    │   └── README.md            # Component docs
    └── TopNav/
        ├── TopNav.js            # Component logic
        ├── TopNav.css           # Component styles
        ├── index.js             # Component export
        └── README.md            # Component docs
```

## 🤝 Contributing

When adding new components to the shared module:

1. Create a new folder in `shared/components/`
2. Include component file, styles, index.js, and README.md
3. Export from `shared/components/index.js`
4. Document props and usage examples
5. Maintain consistent styling with existing components

## 📝 License

This shared module is part of your project and follows your project's license.

---

For detailed documentation on individual components, see their respective README files:
- [SideNav Documentation](./components/SideNav/README.md)
- [TopNav Documentation](./components/TopNav/README.md)

