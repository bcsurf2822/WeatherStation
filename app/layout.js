'use client'
import CssBaseline from '@mui/material/CssBaseline';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
          {children}
      </body>
    </html>
  );
}
