# Flip Hover meta-component - UNFINISHED

This isn't an actual component byitself. It's meant to be added so some other component.

## Usage

add a .flip-hover class to the parent element of the card.

```html

<div class="flip-hover" tabindex="0" aria-role="button" aria-pressed="false">
    <div class="flip-hover__front">
      SOME FRONT CONTENT
    </div>

    <div class="flip-hover__back" aria-hidden="true">
      SOME BACK CONTENT
    </div>
</div>

```

This can be added to any other component as long as you can include these classes and markup.