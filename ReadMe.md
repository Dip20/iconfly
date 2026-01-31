# FontFly

FontFly is a lightweight icon platform built on top of Font Awesome Free SVGs.

## Features

- Searchable icon API
- On-the-fly SVG customization (color, size)
- CDN-backed SVG delivery
- Download raw SVGs
- Framework-ready (React / Vue – coming soon)

## API

### Search Icons
```

GET /api/icons/search?query=user&page=1&limit=20

````

```json
{
  "totalDocs": 124,
  "page": 1,
  "limit": 20,
  "totalPages": 7,
  "data": [
    {
      "key": "user",
      "label": "User",
      "style": "solid",
      "cdnUrl": "https://cdn.fontfly.dev/solid/user.svg"
    }
  ]
}
````

## SVG Customization

```
GET /api/icons/user.svg?color=red&size=24
```

* color: SVG fill color
* size: width & height
* supports currentColor

## Icon Styles

* solid
* regular
* brands

## npm Packages

```
@fontfly/icons
@fontfly/react
@fontfly/vue
```

## License

Icons are from Font Awesome Free (CC BY 4.0) <br>
[https://fontawesome.com](https://fontawesome.com)
<br>
[https://creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/)

