import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '02f08pdt',
  dataset: 'production',
  apiVersion: '2023-04-15',
  useCdn: true,
  token: 'skfS6n5bTOL3p3zWffituBKkSA9z7IwRq2KgPuVZp3GeeltZ04e68dAeTTNQuGgatyNIs68bZBv8a3kr3mqkrjpkjlrqZDpBtKzPc0gnWCDRteYSRW2EfsdNBSJ4X2x3uYPT6tmMqFzayt7qvUEA4i6VqQCLed7WbAeuLb7nXjkrkMEaYPBG'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);