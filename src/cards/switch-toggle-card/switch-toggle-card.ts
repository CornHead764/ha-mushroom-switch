import { css, CSSResultGroup, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { registerCard } from "../../register-card";

const CARD_NAME = "mushroom-switch-toggle-card";
const CARD_EDITOR_NAME = `${CARD_NAME}-editor`;
const SWITCH_DOMAINS = ["switch", "input_boolean"];

registerCard({
  type: CARD_NAME,
  name: "Mushroom Switch Toggle Card",
  description: "Mushroom-style card with inline toggle switch for switch entities",
});

interface SwitchToggleCardConfig {
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
}

@customElement(CARD_NAME)
export class MushroomSwitchToggleCard extends LitElement {
  @property({ attribute: false }) public hass: any;

  @state() private _config?: SwitchToggleCardConfig;

  @property({ reflect: true, type: String })
  public layout: string | undefined;

  public static getStubConfig(hass: any): SwitchToggleCardConfig {
    const entities = Object.keys(hass.states);
    const switches = entities.filter((e) =>
      SWITCH_DOMAINS.includes(e.split(".")[0])
    );
    return {
      type: `custom:${CARD_NAME}`,
      entity: switches[0],
    };
  }

  public static async getConfigElement() {
    await import("./switch-toggle-card-editor");
    return document.createElement(CARD_EDITOR_NAME);
  }

  setConfig(config: SwitchToggleCardConfig): void {
    this._config = {
      tap_action: { action: "more-info" },
      hold_action: { action: "more-info" },
      ...config,
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getLayoutOptions() {
    return { grid_columns: 2, grid_rows: 1 };
  }

  public getGridOptions() {
    return { columns: 6, rows: 1, min_columns: 4, min_rows: 1 };
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

    const iconColor = this._config.icon_color;
    const iconStyle: Record<string, string> = {};
    if (iconColor && active) {
      const rgbColor = this._computeRgbColor(iconColor);
      iconStyle["--icon-color"] = `rgb(${rgbColor})`;
      iconStyle["--shape-color"] = `rgba(${rgbColor}, 0.2)`;
    }

    const stateDisplay = this.hass.formatEntityState
      ? this.hass.formatEntityState(stateObj)
      : stateObj.state;

    const primaryDisplay = this._computeInfoDisplay(primaryInfo, name, stateDisplay, stateObj);
    const secondaryDisplay = this._computeInfoDisplay(secondaryInfo, name, stateDisplay, stateObj);

    const picture = iconType === "entity-picture" ? stateObj.attributes.entity_picture : undefined;

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
            <div class="toggle-wrapper" @click=${this._handleToggleClick}>
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
      }
      .main-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: var(--spacing);
        gap: var(--spacing);
        cursor: pointer;
        box-sizing: border-box;
        height: 100%;
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
        --icon-color: rgb(var(--rgb-state-entity, var(--rgb-blue, 33, 150, 243)));
        --shape-color: rgba(var(--rgb-state-entity, var(--rgb-blue, 33, 150, 243)), 0.2);
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

      /* Toggle switch - inline, right-aligned */
      .toggle-wrapper {
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
        background-color: rgba(var(--rgb-state-entity, var(--rgb-blue, 33, 150, 243)), 0.4);
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
        background-color: rgb(var(--rgb-state-entity, var(--rgb-blue, 33, 150, 243)));
      }
      .toggle--disabled .toggle-track {
        opacity: 0.5;
      }
      .toggle--disabled {
        cursor: not-allowed;
      }
    `;
  }
}
