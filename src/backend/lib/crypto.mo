import Sha256 "mo:sha2/Sha256";
import Char "mo:core/Char";
import Nat32 "mo:core/Nat32";

module {
  // Application-wide pepper mixed into every password hash. This is defense in
  // depth only; per-user random salts stored alongside each hash remain a
  // recommended follow-up.
  let PEPPER : Text = "arcomputer::";

  func nibbleToChar(n : Nat8) : Char {
    let d = n.toNat();
    if (d < 10) Char.fromNat32(Nat32.fromNat(d + 0x30)) // '0'-'9'
    else Char.fromNat32(Nat32.fromNat(d - 10 + 0x61)); // 'a'-'f'
  };

  func toHex(bytes : Blob) : Text {
    var out = "";
    for (byte in bytes.values()) {
      out #= nibbleToChar(byte >> 4).toText();
      out #= nibbleToChar(byte & 0x0f).toText();
    };
    out;
  };

  // One-way SHA-256 hash of a secret, hex-encoded. Used for password storage
  // and admin credential verification so no plaintext secret is persisted or
  // committed to source.
  public func hashSecret(secret : Text) : Text {
    let digest = Sha256.fromBlob((PEPPER # secret).encodeUtf8());
    toHex(digest);
  };
};
