/**
 *
 */
export default class Validator {
  /**
   *
   * @param must: boolean
   */
  static register = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    phone: {
      presence: must,
      type: "string",
      length: { maximum: 15, minimum: 10 },
    },
    password: {
      presence: must,
      type: "string",
      length: { maximum: 15, minimum: 4 },
    },
  });
  static otp = () => ({
    otp: {
      presence: true,
      type: "string",
    }
  })
  static login=(): any => ({
        phone: {
          presence: true,
          type: "string",
          length: { maximum: 15, minimum: 10 },
        },
        password: {
          presence: true,
          type: "string",
          length: { maximum: 15, minimum: 4 },
        },
  })
  static pass=(): any => ({
        phone: {
          presence: true,
          type: "string",
          length: { maximum: 15, minimum: 10 },
        },
        newPassword: {
          presence: true,
          type: "string",
          length: { maximum: 15, minimum: 4 },
        },
  })
}
