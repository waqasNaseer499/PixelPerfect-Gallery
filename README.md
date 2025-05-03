# PixelPerfect Gallery

A modern React-based image gallery web application that uses the Pexels API to let users search, browse, and save their favorite images.


## Features

- 🔍 **Search Images**: Search for photos from the Pexels API
- 📱 **Responsive Design**: Works on all devices with a clean, modern UI
- 💾 **Save Favorites**: Save your favorite images to view later
- 🖼️ **Image Lightbox**: Click on images to view them in a larger format
- 📄 **Pagination**: Browse through multiple pages of search results

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone git@github.com:waqasNaseer499/PixelPerfect-Gallery.git
   cd pixelperfect-gallery
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or with yarn:
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Pexels API key:
   ```
   VITE_APP_PEXELS_API_KEY=your_pexels_api_key_here
   ```

   To get a Pexels API key:
   - Sign up at [Pexels](https://www.pexels.com/api/)
   - Request an API key
   - Copy the key to your `.env` file

4. Start the development server:
   ```
   npm run dev
   ```
   or with yarn:
   ```
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
pixelperfect-gallery/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── ImageCard.js
│   │   ├── Lightbox.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
└── package.json
```
## Credits

- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Images provided by [Pexels](https://www.pexels.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.