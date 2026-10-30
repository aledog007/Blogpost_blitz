import Document, { Html, Main, NextScript, Head } from 'next/document';

class MyDocument extends Document {
	// Only uncomment if you need to customize this behaviour
	// static async getInitialProps(ctx: DocumentContext) {
	//   const initialProps = await Document.getInitialProps(ctx)
	//   return {...initialProps}
	// }
	render() {
		return (
			<Html lang="de">
				<Head>
					<meta name="description" content="Minimaler Blog mit Blitz.js – Framework-Vergleich" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
