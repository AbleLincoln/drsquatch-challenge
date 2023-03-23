# Dr. Squatch Coding Challenge

Hi guys!

This is my submission for the take-home portion of the coding challenge.

## Live Preview

I have a deployed a live version of the site using Vercel. You can view it [here](https://drsquatch-challenge.vercel.app/).

## Running The Project Locally

```sh
npm install
npm run dev
```

Then visit `http://127.0.0.1:5174/` to view

## The Stack

### Framework

This project is built with `Vue` 3. I scaffolded the project using `Vite` and `create-vue`.

### Libraries

- ESLint and Prettier for code formatting and linting
- TailwindCSS for styling

### Custom Components and Libraries

`App.vue` is the launch point for the app. Basically all of the state is managed here and propagates down to the children components.

`ScentFilter.vue` is the filtering toolbar. This component is mostly just for display, as all of the filtering logic is handled in `App.vue`. `ScentFilter` uses the `v-model` to pass state between its inputs (checkboxes) and the parent component.

`BundleItem.vue` is the component for displaying Bundles. There is some work being done here to format the products and prices.
This component uses `ScentPill.vue` to display the little colored scent icons.

I am using CSS variables to display the special scent colors across the site. The variables are just stored as the name of the scent, so I can easily access it any where I could put CSS.
This allows for extra extensibility regarding the colors. For instance, I could easily apply these colors to the fonts, or make animations based on this color palette.

`bundler.js` is where I spent a majority of my time. This mini library does a lot of the heavy lifting for the app. It's essentially a "composable" function that encapsulates all of the logic for fetching data and preparing it for use in the app.

## Challenges

Originally I was simply fetching the bundle data in `App.vue` and then fetching the associated product data in `BundleItem.vue`.
I quickly realized, however, that I needed the product data at the top-level of the app. The product data is where the scent profiles are actually stored, and I wanted to be able to sort on this without having to pass state all around the app.

This led to me creating a small data pipeline. This single function fetches the bundle data then immediately fetches the associated product and combines it all into one mega object. In my opinion, this is how the data should come in the first place. It would alleviate stress on the network.
I assume this data format is a limitation of the Shopify API.
I actually remember from working at Parachute Home that we had to have a few complicated bundler libraries to make up for the shortcomings of Shopify.

## Improvements

If I had more time I would have liked to include some error handling in my network requests. For this project, the API calls were guaranteed to work; however, in order to make this better reflect a real world app I should take into account the fact that not all network requests are going to return nicely.
