import { css, CSSResultGroup, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { registerCard } from "../../register-card";

const CARD_NAME = "mushroom-light-toggle-card";
const CARD_EDITOR_NAME = `${CARD_NAME}-editor`;
const LIGHT_DOMAINS = ["light"];

registerCard({
  type: CARD_NAME,
  name: "Mushroom Light Toggle Card",
  description: "Mushroom-style light card with inline toggle switch and brightness slider",
});

interface LightToggleCardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  icon_color?: string;
  layout?: "default" | "horizontal" | "vertical";
  fill_container?: boolean;
  primary_info?: string;
  secondary_info?: string;
  icon_type?: string;
  tap_action?: any;
  hold_action?: any;
  double_tap_action?: any;
  show_brightness_control?: boolean;
  use_light_color?: boolean;
  collapsible_controls?: boolean;
}

@customElement(CARD_NAME)
export class MushroomLightToggleCard extends LitElement {
  @property({ attribute: false }) public hass: any;

  @state() private _config?: LightToggleCardConfig;

  @state() private _brightness?: number;

  @state() private _sliderValue?: number;

  @property({ reflect: true, type: String })
  public layout: string | undefined;

  public static getStubConfig(hass: any): LightToggleCardConfig {
    const entities = Object.keys(hass.states);
    const lights = entities.filter((e) => LIGHT_DOMAINS.includes(e.split(".")[0]));
    return {
      type: `custom:${CARD_NAME}`,
      entity: lights[0],
      show_brightness_control: true,
    };
  }

  public static async getConfigElement() {
    await import("./light-toggle-card-editor");
    return document.createElement(CARD_EDITOR_NAME);
  }

  setConfig(config: LightToggleCardConfig): void {
    this._config = {
      tap_action: { action: "more-info" },
      hold_action: { action: "more-info" },
      ...config,
    };
  }

  public getCardSize(): number {
    return this._config?.show_brightness_control ? 2 : 1;
  }

  public getLayoutOptions() {
    return {
      grid_columns: 2,
      grid_rows: this._config?.show_brightness_control ? 2 : 1,
    };
  }

  public getGridOptions() {
    return {
      columns: 6,
      rows: this._config?.show_brightness_control ? 2 : 1,
      min_columns: 4,
      min_rows: 1,
    };
  }

  private get _stateObj(): any | undefined {
    if (!this._config || !this.hass || !this._config.entity) return undefined;
    return this.hass.states[this._config.entity];
  }

  private _isActive(stateObj: any): boolean {
    return stateObj.state !== "unavailable" && stateObj.state !== "unknown" && stateObj.state !== "off";
  }

  private _isAvailable(stateObj: any): boolean {
    return stateObj.state !== "unavailable";
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (this.hass && changedProperties.has("hass")) {
      this._updateBrightness();
    }
  }

  private _updateBrightness() {
    const stateObj = this._stateObj;
    if (!stateObj || !this._isActive(stateObj)) {
      this._brightness = undefined;
      return;
    }
    this._brightness = stateObj.attributes.brightness;
  }

  private _handleAction(): void {
    if (!this.hass || !this._config) return;
    const action = this._config.tap_action?.action || "more-info";
    if (action === "more-info") {
      this._fireMoreInfo();
    } else if (action === "toggle") {
      this._toggleEntity();
    }
  }

  private _fireMoreInfo(): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        composed: true,
        bubbles: true,
        detail: { entityId: this._config?.entity },
      })
    );
  }

  private _toggleEntity(): void {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService("homeassistant", "toggle", {
      entity_id: this._config.entity,
    });
  }

  private _handleToggleClick(e: Event): void {
    e.stopPropagation();
    this._toggleEntity();
  }

  private _handleSliderInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement;
    this._sliderValue = parseInt(target.value, 10);
  }

  private _handleSliderChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    this._sliderValue = undefined;

    if (!this.hass || !this._config?.entity) return;
    this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      brightness_pct: value,
    });
  }

  private _getRGBColor(stateObj: any): number[] | undefined {
    const rgbColor =
      stateObj.attributes.rgb_color ||
      stateObj.attributes.rgbw_color ||
      stateObj.attributes.rgbww_color;
    return rgbColor ? rgbColor.slice(0, 3) : undefined;
  }

  protected render() {
    if (!this._config || !this.hass || !this._config.entity) {
      return nothing;
    }

    const stateObj = this._stateObj;
    if (!stateObj) {
      return this._renderNotFound();
    }

    const name = this._config.name || stateObj.attributes.friendly_name || "";
    const icon = this._config.icon;
    const active = this._isActive(stateObj);
    const available = this._isAvailable(stateObj);
    const isOn = stateObj.state === "on";

    const fillContainer = this._config.fill_container || false;
    const iconType = this._config.icon_type || "icon";
    const primaryInfo = this._config.primary_info || "name";
    const secondaryInfo = this._config.secondary_info || "state";

    // Compute icon color
    const lightRgbColor = this._getRGBColor(stateObj);
    const iconColor = this._config.icon_color;
    const useLightColor = this._config.use_light_color;
    const iconStyle: Record<string, string> = {};

    if (lightRgbColor && useLightColor && active) {
      const color = lightRgbColor.join(",");
      iconStyle["--icon-color"] = `rgb(${color})`;
      iconStyle["--shape-color"] = `rgba(${color}, 0.25)`;
    } else if (iconColor && active) {
      const rgbColor = this._computeRgbColor(iconColor);
      iconStyle["--icon-color"] = `rgb(${rgbColor})`;
      iconStyle["--shape-color"] = `rgba(${rgbColor}, 0.2)`;
    }

    // Compute brightness display
    let stateDisplay = this.hass.formatEntityState
      ? this.hass.formatEntityState(stateObj)
      : stateObj.state;
    if (this._brightness != null && this.hass.formatEntityAttributeValue) {
      stateDisplay = this.hass.formatEntityAttributeValue(stateObj, "brightness", this._brightness);
    }

    const primaryDisplay = this._computeInfoDisplay(primaryInfo, name, stateDisplay, stateObj);
    const secondaryDisplay = this._computeInfoDisplay(secondaryInfo, name, stateDisplay, stateObj);

    const picture = iconType === "entity-picture" ? stateObj.attributes.entity_picture : undefined;

    // Brightness
    const brightnessPercent =
      this._sliderValue ?? (this._brightness != null ? Math.round((this._brightness / 255) * 100) : 0);

    const showBrightness = this._config.show_brightness_control && active && available;
    const isCollapsible = this._config.collapsible_controls;
    const showControls = showBrightness && (!isCollapsible || active);

    // Slider color
    const sliderStyle: Record<string, string> = {};
    if (lightRgbColor && useLightColor && active) {
      const color = lightRgbColor.join(",");
      sliderStyle["--slider-color"] = `rgb(${color})`;
      sliderStyle["--slider-bg-color"] = `rgba(${color}, 0.2)`;
    } else if (iconColor && active) {
      const rgbColor = this._computeRgbColor(iconColor);
      sliderStyle["--slider-color"] = `rgb(${rgbColor})`;
      sliderStyle["--slider-bg-color"] = `rgba(${rgbColor}, 0.2)`;
    }

    // Toggle color based on light color
    const toggleStyle: Record<string, string> = {};
    if (lightRgbColor && useLightColor && active) {
      const color = lightRgbColor.join(",");
      toggleStyle["--toggle-active-color"] = `${color}`;
    }

    return html`
      <ha-card class=${classMap({ "fill-container": fillContainer })}>
        <div class="card-content">
          <div class="main-row" @click=${this._handleAction}>
            ${iconType !== "none"
              ? html`
                  <div class="icon-container">
                    ${picture
                      ? html`
                          <mushroom-shape-avatar
                            .picture_url=${this.hass.hassUrl ? this.hass.hassUrl(picture) : picture}
                          ></mushroom-shape-avatar>
                        `
                      : html`
                          <mushroom-shape-icon .disabled=${!active} style=${styleMap(iconStyle)}>
                            <ha-state-icon .hass=${this.hass} .stateObj=${stateObj} .icon=${icon}></ha-state-icon>
                          </mushroom-shape-icon>
                        `}
                    ${!available
                      ? html`<mushroom-badge-icon class="unavailable" icon="mdi:help"></mushroom-badge-icon>`
                      : nothing}
                  </div>
                `
              : nothing}
            ${primaryInfo !== "none" || secondaryInfo !== "none"
              ? html`
                  <mushroom-state-info
                    .primary=${primaryDisplay}
                    .secondary=${secondaryDisplay}
                  ></mushroom-state-info>
                `
              : nothing}
            <div
              class="toggle-wrapper"
              style=${styleMap(toggleStyle)}
              @click=${this._handleToggleClick}
            >
              <div
                class=${classMap({
                  toggle: true,
                  "toggle--on": isOn,
                  "toggle--off": !isOn,
                  "toggle--disabled": !available,
                })}
              >
                <div class="toggle-track">
                  <div class="toggle-knob"></div>
                </div>
              </div>
            </div>
          </div>
          ${showControls
            ? html`
                <div class="controls" style=${styleMap(sliderStyle)}>
                  <div class="brightness-slider-container">
                    <input
                      type="range"
                      class="brightness-slider"
                      min="1"
                      max="100"
                      .value=${String(brightnessPercent)}
                      @input=${this._handleSliderInput}
                      @change=${this._handleSliderChange}
                    />
                    <div
                      class="brightness-slider-track"
                      style=${styleMap({ width: `${brightnessPercent}%` })}
                    ></div>
                  </div>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderNotFound() {
    return html`
      <ha-card>
        <div class="card-content">
          <div class="main-row">
            <div class="icon-container">
              <mushroom-shape-icon disabled>
                <ha-icon icon="mdi:help"></ha-icon>
              </mushroom-shape-icon>
              <mushroom-badge-icon class="not-found" icon="mdi:exclamation-thick"></mushroom-badge-icon>
            </div>
            <mushroom-state-info
              .primary=${this._config?.entity}
              .secondary=${"Not found"}
            ></mushroom-state-info>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _computeRgbColor(color: string): string {
    const COLORS = [
      "primary", "accent", "red", "pink", "purple", "deep-purple",
      "indigo", "blue", "light-blue", "cyan", "teal", "green",
      "light-green", "lime", "yellow", "amber", "orange", "deep-orange",
      "brown", "light-grey", "grey", "dark-grey", "blue-grey",
      "black", "white", "disabled",
    ];
    if (color === "primary" || color === "accent") return `var(--rgb-${color}-color)`;
    if (COLORS.includes(color)) return `var(--rgb-${color})`;
    if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    }
    return color;
  }

  private _computeInfoDisplay(
    info: string, name: string, state: string, stateObj: any
  ): string | undefined {
    switch (info) {
      case "name": return name;
      case "state": return state;
      case "last-changed": return stateObj.last_changed;
      case "last-updated": return stateObj.last_updated;
      case "none": return undefined;
      default: return name;
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --spacing: var(--mush-spacing, 10px);
        --icon-size: var(--mush-icon-size, 36px);
        --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
        --icon-border-radius: var(--mush-icon-border-radius, 50%);
        --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
        --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
        --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
        --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
        --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
        --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
        --card-primary-color: var(--mush-card-primary-color, var(--primary-text-color));
        --card-secondary-color: var(--mush-card-secondary-color, var(--primary-text-color));
        --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
        --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
        --control-spacing: var(--mush-control-spacing, 12px);
        --control-height: var(--mush-control-height, 42px);
        --control-border-radius: var(--mush-control-border-radius, 12px);
        --badge-size: var(--mush-badge-size, 16px);
        --badge-icon-size: var(--mush-badge-icon-size, 0.75em);
        --badge-border-radius: var(--mush-badge-border-radius, 50%);
        --layout-align: var(--mush-layout-align, center);
      }
      ha-card {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: var(--layout-align);
        height: auto;
      }
      ha-card.fill-container {
        height: 100%;
      }
      :host([layout="grid"]) ha-card {
        height: 100%;
      }
      .card-content {
        display: flex;
        flex-direction: column;
        margin: calc(-1 * var(--ha-card-border-width, 1px));
      }
      .main-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: var(--spacing);
        gap: var(--spacing);
        cursor: pointer;
        box-sizing: border-box;
      }
      .icon-container {
        position: relative;
        flex-shrink: 0;
      }
      .icon-container mushroom-badge-icon {
        position: absolute;
        top: -3px;
        right: -3px;
      }
      mushroom-shape-icon {
        --icon-color: rgb(var(--rgb-state-light, var(--rgb-orange, 255, 152, 0)));
        --shape-color: rgba(var(--rgb-state-light, var(--rgb-orange, 255, 152, 0)), 0.2);
      }
      mushroom-state-info {
        min-width: 0;
        flex: 1;
      }
      .unavailable {
        --main-color: rgb(var(--rgb-warning, var(--rgb-orange, 255, 152, 0)));
      }
      .not-found {
        --main-color: rgb(var(--rgb-danger, var(--rgb-red, 244, 67, 54)));
      }

      /* Toggle switch - inline with entity info, right-aligned */
      .toggle-wrapper {
        --toggle-active-color: var(--rgb-state-light, var(--rgb-orange, 255, 152, 0));
        flex-shrink: 0;
        cursor: pointer;
        padding: 4px;
        -webkit-tap-highlight-color: transparent;
      }
      .toggle {
        position: relative;
        display: inline-flex;
        align-items: center;
      }
      .toggle-track {
        width: 46px;
        height: 26px;
        border-radius: 13px;
        background-color: rgba(var(--rgb-disabled, 189, 189, 189), 0.4);
        transition: background-color 280ms ease-in-out;
        position: relative;
        display: flex;
        align-items: center;
      }
      .toggle--on .toggle-track {
        background-color: rgba(var(--toggle-active-color), 0.4);
      }
      .toggle-knob {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgb(var(--rgb-disabled, 189, 189, 189));
        position: absolute;
        left: 3px;
        transition: transform 280ms ease-in-out, background-color 280ms ease-in-out;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .toggle--on .toggle-knob {
        transform: translateX(20px);
        background-color: rgb(var(--toggle-active-color));
      }
      .toggle--disabled .toggle-track {
        opacity: 0.5;
      }
      .toggle--disabled {
        cursor: not-allowed;
      }

      /* Brightness slider - below the main row, full width */
      .controls {
        --slider-color: rgb(var(--rgb-state-light, var(--rgb-orange, 255, 152, 0)));
        --slider-bg-color: rgba(var(--rgb-state-light, var(--rgb-orange, 255, 152, 0)), 0.2);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: var(--control-spacing);
        padding-top: 0;
        box-sizing: border-box;
        gap: var(--control-spacing);
      }
      .brightness-slider-container {
        flex: 1;
        height: var(--control-height);
        border-radius: var(--control-border-radius);
        background-color: var(--slider-bg-color);
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }
      .brightness-slider {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        opacity: 0;
        cursor: pointer;
        z-index: 2;
        -webkit-appearance: none;
        appearance: none;
      }
      .brightness-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 0;
        height: 0;
      }
      .brightness-slider::-moz-range-thumb {
        width: 0;
        height: 0;
        border: none;
      }
      .brightness-slider-track {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: var(--slider-color);
        border-radius: var(--control-border-radius);
        transition: width 100ms ease-in-out;
        pointer-events: none;
      }
    `;
  }
}
