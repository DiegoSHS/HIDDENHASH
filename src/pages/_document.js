import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{backgroundImage:'url(/background.jpg)',backgroundSize:'cover',backgroundPosition:'center',backgroundAttachment:'fixed', backgroundRepeat:'no-repeat'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
