import Header from "../component/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header classname="overflow-x-hidden"></Header>
        {children}
      </body>
    </html>
  );
}
