import Head from 'next/head';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title key="title">Contact us</title>
      </Head>
      <main>
        <h1>Contact us</h1>
        {/* Create a div element for the contact information */}
        <div className="mx-auto max-w-lg">
          {/* Create a p element for the phone number */}
         
          {/* Create a p element for the address */}
        
          {/* Create a p element for the website */}
        
          {/* Create a p element for the email */}
          <p className="mb-4">
            <span className="font-bold">Email:</span>{' '}
            <a href="mailto:ak7085330@gmail.com" className="text-blue-500">
            ak7085330@gmail.com
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
