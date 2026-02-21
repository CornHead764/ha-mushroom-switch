# ha-mushroom-switch

Custom Mushroom-style cards for Home Assistant that add proper toggle switches.

**Requires [lovelace-mushroom](https://github.com/piitaya/lovelace-mushroom) to be installed** - these cards reuse Mushroom's shared UI components.

## Cards

### Mushroom Switch Card (`custom:mushroom-switch-card`)

A dedicated card for `switch` and `input_boolean` entities with an inline toggle switch. The layout is:

```
[icon]  Entity Name          [toggle switch]
        State
```

Tap the card to open more-info. Tap the toggle to turn on/off.

**Config options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | required | Entity ID (`switch.*` or `input_boolean.*`) |
| `name` | string | friendly_name | Display name |
| `icon` | string | entity default | MDI icon override |
| `icon_color` | string | | Icon color (mushroom color name or hex) |
| `icon_type` | string | `icon` | `icon`, `entity-picture`, or `none` |
| `primary_info` | string | `name` | `name`, `state`, `last-changed`, `last-updated`, `none` |
| `secondary_info` | string | `state` | Same options as primary_info |
| `fill_container` | boolean | false | Fill the card container height |
| `tap_action` | action | more-info | Action on card tap |
| `hold_action` | action | more-info | Action on card hold |

### Mushroom Light Toggle Card (`custom:mushroom-light-toggle-card`)

A light card with an inline toggle switch and optional brightness slider underneath:

```
[icon]  Light Name           [toggle switch]
        Brightness
[====== brightness slider ================]
```

**Config options:**

All options from the Switch Card above, plus:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | required | Entity ID (`light.*`) |
| `show_brightness_control` | boolean | false | Show brightness slider below |
| `use_light_color` | boolean | false | Tint icon/slider/toggle with light's color |
| `collapsible_controls` | boolean | false | Hide brightness when light is off |

## Installation

### HACS (Recommended)

1. Add this repository as a custom repository in HACS
2. Search for "Mushroom Switch Card" and install
3. Add the resource if not automatically added

### Manual

1. Download `mushroom-switch.js` from the [latest release](../../releases)
2. Copy to `config/www/mushroom-switch.js`
3. Add as a resource in your dashboard:
   - URL: `/local/mushroom-switch.js`
   - Type: JavaScript Module

## Example YAML

```yaml
type: custom:mushroom-switch-card
entity: switch.living_room_lamp

type: custom:mushroom-light-toggle-card
entity: light.bedroom
show_brightness_control: true
use_light_color: true
```
