import { css, CSSResultGroup, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

const CARD_EDITOR_NAME = "mushroom-light-toggle-card-editor";

const SCHEMA = [
  {
    name: "entity",
    selector: { entity: { domain: ["light"] } },
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
          "primary", "accent", "red", "pink", "purple", "deep-purple",
          "indigo", "blue", "light-blue", "cyan", "teal", "green",
          "light-green", "lime", "yellow", "amber", "orange", "deep-orange",
          "brown", "grey", "disabled",
        ],
        mode: "dropdown",
        custom_value: true,
      },
    },
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "use_light_color", selector: { boolean: {} } },
      { name: "show_brightness_control", selector: { boolean: {} } },
      { name: "collapsible_controls", selector: { boolean: {} } },
    ],
  },
  { name: "tap_action", selector: { ui_action: {} } },
  { name: "hold_action", selector: { ui_action: {} } },
  { name: "double_tap_action", selector: { ui_action: {} } },
];

@customElement(CARD_EDITOR_NAME)
export class MushroomLightToggleCardEditor extends LitElement {
  @property({ attribute: false }) public hass: any;

  @state() private _config: any;

  setConfig(config: any): void {
    this._config = config;
  }

  private _computeLabel(schema: any): string {
    const labels: Record<string, string> = {
      entity: "Entity",
      name: "Name",
      icon: "Icon",
      icon_color: "Icon Color",
      layout: "Layout",
      fill_container: "Fill Container",
      primary_info: "Primary Info",
      secondary_info: "Secondary Info",
      icon_type: "Icon Type",
      use_light_color: "Use Light Color",
      show_brightness_control: "Show Brightness Control",
      collapsible_controls: "Collapsible Controls",
      tap_action: "Tap Action",
      hold_action: "Hold Action",
      double_tap_action: "Double Tap Action",
    };
    return labels[schema.name] || schema.name;
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
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
    `;
  }
}
