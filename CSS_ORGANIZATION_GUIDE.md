# CSS Organization Guide - Begin the Work

## Current CSS Structure (Post-Audit)

### Main CSS Files
- **`src/assets/css/style.css`** - Primary stylesheet with CSS variables and all component styles
- **`src/assets/css/default.css`** - Utility classes (margins, padding, colors, backgrounds)
- **`src/assets/css/responsive.css`** - Responsive breakpoints and mobile styles

### Component CSS Files
- **Page-specific styles**: `src/pages/*.css`
- **Component styles**: `src/components/*.css`

### Third-Party CSS Files
- Bootstrap, FontAwesome, Owl Carousel, etc. (unchanged)

## CSS Variables Available

### Colors
```css
--primary-color: #2a4799;      /* Main brand blue */
--secondary-color: #ff3d4f;    /* Accent red */
--accent-color: #f6f5ff;       /* Light purple-blue */
--dark-bg: #000a2d;            /* Dark blue background */
--light-bg: #f8f9fa;           /* Light gray background */
--text-dark: #333;             /* Dark text */
--text-light: #666;            /* Medium text */
--text-muted: #888;            /* Muted text */
```

### Spacing
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-xxl: 3rem;     /* 48px */
```

### Typography
```css
--font-primary: 'Rubik', sans-serif;
--font-secondary: 'Rufina', serif;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
```

### Other
```css
--border-radius-sm: 4px;
--border-radius-md: 8px;
--border-radius-lg: 12px;
--border-radius-full: 50%;
--shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
--shadow-md: 0 4px 8px rgba(0,0,0,0.15);
--shadow-lg: 0 8px 16px rgba(0,0,0,0.2);
```

## How to Use CSS Variables

### Instead of hardcoded colors:
```css
/* OLD */
color: #2a4799;
background: #ff3d4f;

/* NEW */
color: var(--primary-color);
background: var(--secondary-color);
```

### Instead of hardcoded spacing:
```css
/* OLD */
margin-bottom: 16px;
padding: 24px;

/* NEW */
margin-bottom: var(--spacing-md);
padding: var(--spacing-lg);
```

## CSS File Loading Order

1. **Third-party CSS** (Bootstrap, FontAwesome, etc.)
2. **Default utilities** (`default.css`)
3. **Main styles** (`style.css`) - Contains CSS variables and component styles
4. **Responsive styles** (`responsive.css`)
5. **Component-specific styles** (loaded by individual components)

## Best Practices

### 1. Use CSS Variables
- Always use CSS variables for colors, spacing, and typography
- This ensures consistency across the site
- Makes theme changes easier

### 2. Component Organization
- Keep component-specific styles in their own CSS files
- Use BEM naming convention for component classes
- Avoid global styles that affect multiple components

### 3. Utility Classes
- Use utility classes from `default.css` for common spacing and colors
- Don't create new utility classes unless absolutely necessary

### 4. Responsive Design
- Use the responsive breakpoints defined in `responsive.css`
- Test on multiple screen sizes

## Debugging CSS

### Finding Styles
1. **Check component CSS files first** - Most specific styles
2. **Check main style.css** - Global component styles
3. **Check default.css** - Utility classes
4. **Use browser inspector** - Shows computed styles and sources

### CSS Specificity
- Inline styles (highest priority)
- IDs (`#id`)
- Classes (`.class`)
- Elements (`div`, `p`, etc.)

### Common Issues
- **Styles not applying**: Check CSS specificity and loading order
- **Conflicting styles**: Look for duplicate rules in multiple files
- **Responsive issues**: Check if styles are overridden in responsive.css

## Future Improvements

1. **CSS Modules**: Consider using CSS modules for better component isolation
2. **Sass/SCSS**: Consider migrating to Sass for better organization
3. **CSS-in-JS**: Consider using styled-components for dynamic styling
4. **Purge CSS**: Remove unused CSS to improve performance

## Maintenance

- **Regular audits**: Review CSS files quarterly for unused styles
- **Consolidation**: Merge similar styles to reduce duplication
- **Documentation**: Keep this guide updated as the CSS evolves
