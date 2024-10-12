# Manual on using shadcn/ui with kaif

Original documentation: https//ui.shadcn.com

This piece of text will guide you through using
components of shadcn ui with kaif.
Feel free to contribute.

Componets are subdiveded into groups based on the
support status.


## Alert (probably)
## Badge (probably)
## Card ✅
## Data Talbe (maybe?)
## Input (probably)
## Pagination (probably)
## Resizable (maybe? they embed vendor react)
## Skeleton (probably)
## Table (probably)
## Textarea (probably)

```
npx shadcn@latest add card
```

Replace `import * as React from "react"`
to `import Kaif from 'kaif'`
and optionally add
`/** @jsx Kaif.h @jsxFrag Kaif.Fragment */`
if you don't have jsx configured somewhere else.

Remove refs and React.forwardRef s.

## Breadcrumb (probably) (without slots)
## Button ✅ (without slots)

Repeat same steps as Card, do not use asChild
functionality.
Optionally remove @radix-ui/react-slot,
as it will not be used.


## Accordion ❌
## Alert Dialog ❌
## Aspect Ratio ❌
## Avatar ❌
## Calendar ❌
## etc...

those componets heavily rely on radix ui and react
or other react-specific libraries to work.

