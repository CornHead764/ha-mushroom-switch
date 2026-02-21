import { css, CSSResultGroup, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

const CARD_EDITOR_NAME = "mushroom-switch-toggle-card-editor";

const SCHEMA = [
  {
    name: "entity",
    selector: { entity: { domain: ["switch", "input_boolean"] } },
  },
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "layout",
        selector: {
          select: {
            options: ["default", "horizontal", "vertical"],
            mode: "dropdown",
          },
        },
      },
      { name: "fill_container", selector: { boolean: {} } },
    ],
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "primary_info",
        selector: {
          select: {
            options: ["name", "state", "last-changed", "last-updated", "none"],
            mode: "dropdown",
          },
        },
      },
      {
        name: "secondary_info",
        selector: {
          select: {
            options: ["name", "state", "last-changed", "last-updated", "none"],
            mode: "dropdown",
          },
        },
      },
      {
        name: "icon_type",
        selector: {
          select: {
            options: ["icon", "entity-picture", "none"],
            mode: "dropdown",
          },
        },
      },
    ],
  },
  {
    name: "icon_color",
    selector: {
      select: {
        options: [
          "primary",
          "accent",
          "red",
          "pink",
          "purple",
          "deep-purple",
          "indigo",
          "blue",
          "light-blue",
          "cyan",
          "teal",
          "green",
          "light-green",
          "lime",
          "yellow",
          "amber",
          "orange",
          "deep-orange",
          "brown",
          "grey",
          "disabled",
        ],
        mode: "dropdown",
        custom_value: true,
      },
    },
  },
  { name: "tap_action", selector: { ui_action: {} } },
  { name: "hold_action", selector: { ui_action: {} } },
  { name: "double_tap_action", selector: { ui_action: {} } },
];

@customElement(CARD_EDITOR_NAME)
export class MushroomSwitchToggleCardEditor extends LitElement {
  @property({ attribute: false }) public hass: any;

  @state() private _config: any;

  setConfig(config: any): void {
    this._config = config;
  }

  private _computeLabel(schema: any): string {
    if (this.hass) {
      switch (schema.name) {
        case "entity":
          return "Entity";
        case "name":
          return "Name";
        case "icon":
          return "Icon";
        case "icon_color":
          return "Icon Color";
        case "layout":
          return "Layout";
        case "fill_container":
          return "Fill Container";
        case "primary_info":
          return "Primary Info";
        case "secondary_info":
          return "Secondary Info";
        case "icon_type":
          return "Icon Type";
        case "tap_action":
          return "Tap Action";
        case "hold_action":
          return "Hold Action";
        case "double_tap_action":
          return "Double Tap Action";
      }
    }
    return schema.name;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel.bind(this)}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value;
    const event = new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
    `;
  }
}
