# Custom Telugu Fonts

Place your custom Telugu font files in this directory with the following naming convention:

## Required Font Files:

1. **Regular Weight (400)**:
   - `custom-telugu-regular.woff2` (preferred, smallest file size)
   - `custom-telugu-regular.woff` (fallback)
   - `custom-telugu-regular.ttf` (fallback)

2. **Medium Weight (500)**:
   - `custom-telugu-medium.woff2`
   - `custom-telugu-medium.woff`
   - `custom-telugu-medium.ttf`

3. **Bold Weight (700)**:
   - `custom-telugu-bold.woff2`
   - `custom-telugu-bold.woff`
   - `custom-telugu-bold.ttf`

## Font Conversion:

If you only have TTF files, you can convert them to WOFF2 and WOFF formats using:
- Online tools like CloudConvert or FontSquirrel
- Command line tools like `woff2_compress` or `fonttools`

## Font Loading:

The fonts are configured with `font-display: swap` for optimal loading performance. The browser will:
1. Show fallback fonts immediately
2. Swap to custom fonts when they load
3. Use Inter as the English fallback font

## Testing:

After adding your font files, test the website in both Telugu and English to ensure proper rendering and fallback behavior.