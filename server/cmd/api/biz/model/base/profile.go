// Code generated by thriftgo (0.2.5). DO NOT EDIT.

package base

import (
	"database/sql"
	"database/sql/driver"
	"fmt"
	"github.com/apache/thrift/lib/go/thrift"
)

// Profile Service
type Gender int64

const (
	Gender_G_NOT_SPECIFIED Gender = 0
	Gender_MALE            Gender = 1
	Gender_FEMALE          Gender = 2
)

func (p Gender) String() string {
	switch p {
	case Gender_G_NOT_SPECIFIED:
		return "G_NOT_SPECIFIED"
	case Gender_MALE:
		return "MALE"
	case Gender_FEMALE:
		return "FEMALE"
	}
	return "<UNSET>"
}

func GenderFromString(s string) (Gender, error) {
	switch s {
	case "G_NOT_SPECIFIED":
		return Gender_G_NOT_SPECIFIED, nil
	case "MALE":
		return Gender_MALE, nil
	case "FEMALE":
		return Gender_FEMALE, nil
	}
	return Gender(0), fmt.Errorf("not a valid Gender string")
}

func GenderPtr(v Gender) *Gender { return &v }
func (p *Gender) Scan(value interface{}) (err error) {
	var result sql.NullInt64
	err = result.Scan(value)
	*p = Gender(result.Int64)
	return
}

func (p *Gender) Value() (driver.Value, error) {
	if p == nil {
		return nil, nil
	}
	return int64(*p), nil
}

type IdentityStatus int64

const (
	IdentityStatus_UNSUBMITTED IdentityStatus = 0
	IdentityStatus_PENDING     IdentityStatus = 1
	IdentityStatus_VERIFIED    IdentityStatus = 2
	IdentityStatus_AUDITFAILED IdentityStatus = 3
)

func (p IdentityStatus) String() string {
	switch p {
	case IdentityStatus_UNSUBMITTED:
		return "UNSUBMITTED"
	case IdentityStatus_PENDING:
		return "PENDING"
	case IdentityStatus_VERIFIED:
		return "VERIFIED"
	case IdentityStatus_AUDITFAILED:
		return "AUDITFAILED"
	}
	return "<UNSET>"
}

func IdentityStatusFromString(s string) (IdentityStatus, error) {
	switch s {
	case "UNSUBMITTED":
		return IdentityStatus_UNSUBMITTED, nil
	case "PENDING":
		return IdentityStatus_PENDING, nil
	case "VERIFIED":
		return IdentityStatus_VERIFIED, nil
	case "AUDITFAILED":
		return IdentityStatus_AUDITFAILED, nil
	}
	return IdentityStatus(0), fmt.Errorf("not a valid IdentityStatus string")
}

func IdentityStatusPtr(v IdentityStatus) *IdentityStatus { return &v }
func (p *IdentityStatus) Scan(value interface{}) (err error) {
	var result sql.NullInt64
	err = result.Scan(value)
	*p = IdentityStatus(result.Int64)
	return
}

func (p *IdentityStatus) Value() (driver.Value, error) {
	if p == nil {
		return nil, nil
	}
	return int64(*p), nil
}

type ProfileRecord struct {
	AccountID   int64    `thrift:"account_id,1,required" form:"account_id,required" json:"account_id,required" query:"account_id,required"`
	PhotoBlobID int64    `thrift:"photo_blob_id,2,required" form:"photo_blob_id,required" json:"photo_blob_id,required" query:"photo_blob_id,required"`
	Profile     *Profile `thrift:"profile,3,required" form:"profile,required" json:"profile,required" query:"profile,required"`
}

func NewProfileRecord() *ProfileRecord {
	return &ProfileRecord{}
}

func (p *ProfileRecord) GetAccountID() (v int64) {
	return p.AccountID
}

func (p *ProfileRecord) GetPhotoBlobID() (v int64) {
	return p.PhotoBlobID
}

var ProfileRecord_Profile_DEFAULT *Profile

func (p *ProfileRecord) GetProfile() (v *Profile) {
	if !p.IsSetProfile() {
		return ProfileRecord_Profile_DEFAULT
	}
	return p.Profile
}

var fieldIDToName_ProfileRecord = map[int16]string{
	1: "account_id",
	2: "photo_blob_id",
	3: "profile",
}

func (p *ProfileRecord) IsSetProfile() bool {
	return p.Profile != nil
}

func (p *ProfileRecord) Read(iprot thrift.TProtocol) (err error) {

	var fieldTypeId thrift.TType
	var fieldId int16
	var issetAccountID bool = false
	var issetPhotoBlobID bool = false
	var issetProfile bool = false

	if _, err = iprot.ReadStructBegin(); err != nil {
		goto ReadStructBeginError
	}

	for {
		_, fieldTypeId, fieldId, err = iprot.ReadFieldBegin()
		if err != nil {
			goto ReadFieldBeginError
		}
		if fieldTypeId == thrift.STOP {
			break
		}

		switch fieldId {
		case 1:
			if fieldTypeId == thrift.I64 {
				if err = p.ReadField1(iprot); err != nil {
					goto ReadFieldError
				}
				issetAccountID = true
			} else {
				if err = iprot.Skip(fieldTypeId); err != nil {
					goto SkipFieldError
				}
			}
		case 2:
			if fieldTypeId == thrift.I64 {
				if err = p.ReadField2(iprot); err != nil {
					goto ReadFieldError
				}
				issetPhotoBlobID = true
			} else {
				if err = iprot.Skip(fieldTypeId); err != nil {
					goto SkipFieldError
				}
			}
		case 3:
			if fieldTypeId == thrift.STRUCT {
				if err = p.ReadField3(iprot); err != nil {
					goto ReadFieldError
				}
				issetProfile = true
			} else {
				if err = iprot.Skip(fieldTypeId); err != nil {
					goto SkipFieldError
				}
			}
		default:
			if err = iprot.Skip(fieldTypeId); err != nil {
				goto SkipFieldError
			}
		}

		if err = iprot.ReadFieldEnd(); err != nil {
			goto ReadFieldEndError
		}
	}
	if err = iprot.ReadStructEnd(); err != nil {
		goto ReadStructEndError
	}

	if !issetAccountID {
		fieldId = 1
		goto RequiredFieldNotSetError
	}

	if !issetPhotoBlobID {
		fieldId = 2
		goto RequiredFieldNotSetError
	}

	if !issetProfile {
		fieldId = 3
		goto RequiredFieldNotSetError
	}
	return nil
ReadStructBeginError:
	return thrift.PrependError(fmt.Sprintf("%T read struct begin error: ", p), err)
ReadFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T read field %d begin error: ", p, fieldId), err)
ReadFieldError:
	return thrift.PrependError(fmt.Sprintf("%T read field %d '%s' error: ", p, fieldId, fieldIDToName_ProfileRecord[fieldId]), err)
SkipFieldError:
	return thrift.PrependError(fmt.Sprintf("%T field %d skip type %d error: ", p, fieldId, fieldTypeId), err)

ReadFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T read field end error", p), err)
ReadStructEndError:
	return thrift.PrependError(fmt.Sprintf("%T read struct end error: ", p), err)
RequiredFieldNotSetError:
	return thrift.NewTProtocolExceptionWithType(thrift.INVALID_DATA, fmt.Errorf("required field %s is not set", fieldIDToName_ProfileRecord[fieldId]))
}

func (p *ProfileRecord) ReadField1(iprot thrift.TProtocol) error {
	if v, err := iprot.ReadI64(); err != nil {
		return err
	} else {
		p.AccountID = v
	}
	return nil
}

func (p *ProfileRecord) ReadField2(iprot thrift.TProtocol) error {
	if v, err := iprot.ReadI64(); err != nil {
		return err
	} else {
		p.PhotoBlobID = v
	}
	return nil
}

func (p *ProfileRecord) ReadField3(iprot thrift.TProtocol) error {
	p.Profile = NewProfile()
	if err := p.Profile.Read(iprot); err != nil {
		return err
	}
	return nil
}

func (p *ProfileRecord) Write(oprot thrift.TProtocol) (err error) {
	var fieldId int16
	if err = oprot.WriteStructBegin("ProfileRecord"); err != nil {
		goto WriteStructBeginError
	}
	if p != nil {
		if err = p.writeField1(oprot); err != nil {
			fieldId = 1
			goto WriteFieldError
		}
		if err = p.writeField2(oprot); err != nil {
			fieldId = 2
			goto WriteFieldError
		}
		if err = p.writeField3(oprot); err != nil {
			fieldId = 3
			goto WriteFieldError
		}

	}
	if err = oprot.WriteFieldStop(); err != nil {
		goto WriteFieldStopError
	}
	if err = oprot.WriteStructEnd(); err != nil {
		goto WriteStructEndError
	}
	return nil
WriteStructBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write struct begin error: ", p), err)
WriteFieldError:
	return thrift.PrependError(fmt.Sprintf("%T write field %d error: ", p, fieldId), err)
WriteFieldStopError:
	return thrift.PrependError(fmt.Sprintf("%T write field stop error: ", p), err)
WriteStructEndError:
	return thrift.PrependError(fmt.Sprintf("%T write struct end error: ", p), err)
}

func (p *ProfileRecord) writeField1(oprot thrift.TProtocol) (err error) {
	if err = oprot.WriteFieldBegin("account_id", thrift.I64, 1); err != nil {
		goto WriteFieldBeginError
	}
	if err := oprot.WriteI64(p.AccountID); err != nil {
		return err
	}
	if err = oprot.WriteFieldEnd(); err != nil {
		goto WriteFieldEndError
	}
	return nil
WriteFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write field 1 begin error: ", p), err)
WriteFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T write field 1 end error: ", p), err)
}

func (p *ProfileRecord) writeField2(oprot thrift.TProtocol) (err error) {
	if err = oprot.WriteFieldBegin("photo_blob_id", thrift.I64, 2); err != nil {
		goto WriteFieldBeginError
	}
	if err := oprot.WriteI64(p.PhotoBlobID); err != nil {
		return err
	}
	if err = oprot.WriteFieldEnd(); err != nil {
		goto WriteFieldEndError
	}
	return nil
WriteFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write field 2 begin error: ", p), err)
WriteFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T write field 2 end error: ", p), err)
}

func (p *ProfileRecord) writeField3(oprot thrift.TProtocol) (err error) {
	if err = oprot.WriteFieldBegin("profile", thrift.STRUCT, 3); err != nil {
		goto WriteFieldBeginError
	}
	if err := p.Profile.Write(oprot); err != nil {
		return err
	}
	if err = oprot.WriteFieldEnd(); err != nil {
		goto WriteFieldEndError
	}
	return nil
WriteFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write field 3 begin error: ", p), err)
WriteFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T write field 3 end error: ", p), err)
}

func (p *ProfileRecord) String() string {
	if p == nil {
		return "<nil>"
	}
	return fmt.Sprintf("ProfileRecord(%+v)", *p)
}

type Profile struct {
	Identity       *Identity      `thrift:"identity,1,required" form:"identity,required" json:"identity,required" query:"identity,required"`
	IdentityStatus IdentityStatus `thrift:"identity_status,2,required" form:"identity_status,required" json:"identity_status,required" query:"identity_status,required"`
}

func NewProfile() *Profile {
	return &Profile{}
}

var Profile_Identity_DEFAULT *Identity

func (p *Profile) GetIdentity() (v *Identity) {
	if !p.IsSetIdentity() {
		return Profile_Identity_DEFAULT
	}
	return p.Identity
}

func (p *Profile) GetIdentityStatus() (v IdentityStatus) {
	return p.IdentityStatus
}

var fieldIDToName_Profile = map[int16]string{
	1: "identity",
	2: "identity_status",
}

func (p *Profile) IsSetIdentity() bool {
	return p.Identity != nil
}

func (p *Profile) Read(iprot thrift.TProtocol) (err error) {

	var fieldTypeId thrift.TType
	var fieldId int16
	var issetIdentity bool = false
	var issetIdentityStatus bool = false

	if _, err = iprot.ReadStructBegin(); err != nil {
		goto ReadStructBeginError
	}

	for {
		_, fieldTypeId, fieldId, err = iprot.ReadFieldBegin()
		if err != nil {
			goto ReadFieldBeginError
		}
		if fieldTypeId == thrift.STOP {
			break
		}

		switch fieldId {
		case 1:
			if fieldTypeId == thrift.STRUCT {
				if err = p.ReadField1(iprot); err != nil {
					goto ReadFieldError
				}
				issetIdentity = true
			} else {
				if err = iprot.Skip(fieldTypeId); err != nil {
					goto SkipFieldError
				}
			}
		case 2:
			if fieldTypeId == thrift.I32 {
				if err = p.ReadField2(iprot); err != nil {
					goto ReadFieldError
				}
				issetIdentityStatus = true
			} else {
				if err = iprot.Skip(fieldTypeId); err != nil {
					goto SkipFieldError
				}
			}
		default:
			if err = iprot.Skip(fieldTypeId); err != nil {
				goto SkipFieldError
			}
		}

		if err = iprot.ReadFieldEnd(); err != nil {
			goto ReadFieldEndError
		}
	}
	if err = iprot.ReadStructEnd(); err != nil {
		goto ReadStructEndError
	}

	if !issetIdentity {
		fieldId = 1
		goto RequiredFieldNotSetError
	}

	if !issetIdentityStatus {
		fieldId = 2
		goto RequiredFieldNotSetError
	}
	return nil
ReadStructBeginError:
	return thrift.PrependError(fmt.Sprintf("%T read struct begin error: ", p), err)
ReadFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T read field %d begin error: ", p, fieldId), err)
ReadFieldError:
	return thrift.PrependError(fmt.Sprintf("%T read field %d '%s' error: ", p, fieldId, fieldIDToName_Profile[fieldId]), err)
SkipFieldError:
	return thrift.PrependError(fmt.Sprintf("%T field %d skip type %d error: ", p, fieldId, fieldTypeId), err)

ReadFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T read field end error", p), err)
ReadStructEndError:
	return thrift.PrependError(fmt.Sprintf("%T read struct end error: ", p), err)
RequiredFieldNotSetError:
	return thrift.NewTProtocolExceptionWithType(thrift.INVALID_DATA, fmt.Errorf("required field %s is not set", fieldIDToName_Profile[fieldId]))
}

func (p *Profile) ReadField1(iprot thrift.TProtocol) error {
	p.Identity = NewIdentity()
	if err := p.Identity.Read(iprot); err != nil {
		return err
	}
	return nil
}

func (p *Profile) ReadField2(iprot thrift.TProtocol) error {
	if v, err := iprot.ReadI32(); err != nil {
		return err
	} else {
		p.IdentityStatus = IdentityStatus(v)
	}
	return nil
}

func (p *Profile) Write(oprot thrift.TProtocol) (err error) {
	var fieldId int16
	if err = oprot.WriteStructBegin("Profile"); err != nil {
		goto WriteStructBeginError
	}
	if p != nil {
		if err = p.writeField1(oprot); err != nil {
			fieldId = 1
			goto WriteFieldError
		}
		if err = p.writeField2(oprot); err != nil {
			fieldId = 2
			goto WriteFieldError
		}

	}
	if err = oprot.WriteFieldStop(); err != nil {
		goto WriteFieldStopError
	}
	if err = oprot.WriteStructEnd(); err != nil {
		goto WriteStructEndError
	}
	return nil
WriteStructBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write struct begin error: ", p), err)
WriteFieldError:
	return thrift.PrependError(fmt.Sprintf("%T write field %d error: ", p, fieldId), err)
WriteFieldStopError:
	return thrift.PrependError(fmt.Sprintf("%T write field stop error: ", p), err)
WriteStructEndError:
	return thrift.PrependError(fmt.Sprintf("%T write struct end error: ", p), err)
}

func (p *Profile) writeField1(oprot thrift.TProtocol) (err error) {
	if err = oprot.WriteFieldBegin("identity", thrift.STRUCT, 1); err != nil {
		goto WriteFieldBeginError
	}
	if err := p.Identity.Write(oprot); err != nil {
		return err
	}
	if err = oprot.WriteFieldEnd(); err != nil {
		goto WriteFieldEndError
	}
	return nil
WriteFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write field 1 begin error: ", p), err)
WriteFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T write field 1 end error: ", p), err)
}

func (p *Profile) writeField2(oprot thrift.TProtocol) (err error) {
	if err = oprot.WriteFieldBegin("identity_status", thrift.I32, 2); err != nil {
		goto WriteFieldBeginError
	}
	if err := oprot.WriteI32(int32(p.IdentityStatus)); err != nil {
		return err
	}
	if err = oprot.WriteFieldEnd(); err != nil {
		goto WriteFieldEndError
	}
	return nil
WriteFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write field 2 begin error: ", p), err)
WriteFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T write field 2 end error: ", p), err)
}

func (p *Profile) String() string {
	if p == nil {
		return "<nil>"
	}
	return fmt.Sprintf("Profile(%+v)", *p)
}

type Identity struct {
	LicNumber       string `thrift:"lic_number,1,required" form:"lic_number,required" json:"lic_number,required" query:"lic_number,required"`
	Name            string `thrift:"name,2,required" form:"name,required" json:"name,required" query:"name,required"`
	Gender          Gender `thrift:"gender,3,required" form:"gender,required" json:"gender,required" query:"gender,required"`
	BirthDateMillis int64  `thrift:"birth_date_millis,4,required" form:"birth_date_millis,required" json:"birth_date_millis,required" query:"birth_date_millis,required"`
}

func NewIdentity() *Identity {
	return &Identity{}
}

func (p *Identity) GetLicNumber() (v string) {
	return p.LicNumber
}

func (p *Identity) GetName() (v string) {
	return p.Name
}

func (p *Identity) GetGender() (v Gender) {
	return p.Gender
}

func (p *Identity) GetBirthDateMillis() (v int64) {
	return p.BirthDateMillis
}

var fieldIDToName_Identity = map[int16]string{
	1: "lic_number",
	2: "name",
	3: "gender",
	4: "birth_date_millis",
}

func (p *Identity) Read(iprot thrift.TProtocol) (err error) {

	var fieldTypeId thrift.TType
	var fieldId int16
	var issetLicNumber bool = false
	var issetName bool = false
	var issetGender bool = false
	var issetBirthDateMillis bool = false

	if _, err = iprot.ReadStructBegin(); err != nil {
		goto ReadStructBeginError
	}

	for {
		_, fieldTypeId, fieldId, err = iprot.ReadFieldBegin()
		if err != nil {
			goto ReadFieldBeginError
		}
		if fieldTypeId == thrift.STOP {
			break
		}

		switch fieldId {
		case 1:
			if fieldTypeId == thrift.STRING {
				if err = p.ReadField1(iprot); err != nil {
					goto ReadFieldError
				}
				issetLicNumber = true
			} else {
				if err = iprot.Skip(fieldTypeId); err != nil {
					goto SkipFieldError
				}
			}
		case 2:
			if fieldTypeId == thrift.STRING {
				if err = p.ReadField2(iprot); err != nil {
					goto ReadFieldError
				}
				issetName = true
			} else {
				if err = iprot.Skip(fieldTypeId); err != nil {
					goto SkipFieldError
				}
			}
		case 3:
			if fieldTypeId == thrift.I32 {
				if err = p.ReadField3(iprot); err != nil {
					goto ReadFieldError
				}
				issetGender = true
			} else {
				if err = iprot.Skip(fieldTypeId); err != nil {
					goto SkipFieldError
				}
			}
		case 4:
			if fieldTypeId == thrift.I64 {
				if err = p.ReadField4(iprot); err != nil {
					goto ReadFieldError
				}
				issetBirthDateMillis = true
			} else {
				if err = iprot.Skip(fieldTypeId); err != nil {
					goto SkipFieldError
				}
			}
		default:
			if err = iprot.Skip(fieldTypeId); err != nil {
				goto SkipFieldError
			}
		}

		if err = iprot.ReadFieldEnd(); err != nil {
			goto ReadFieldEndError
		}
	}
	if err = iprot.ReadStructEnd(); err != nil {
		goto ReadStructEndError
	}

	if !issetLicNumber {
		fieldId = 1
		goto RequiredFieldNotSetError
	}

	if !issetName {
		fieldId = 2
		goto RequiredFieldNotSetError
	}

	if !issetGender {
		fieldId = 3
		goto RequiredFieldNotSetError
	}

	if !issetBirthDateMillis {
		fieldId = 4
		goto RequiredFieldNotSetError
	}
	return nil
ReadStructBeginError:
	return thrift.PrependError(fmt.Sprintf("%T read struct begin error: ", p), err)
ReadFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T read field %d begin error: ", p, fieldId), err)
ReadFieldError:
	return thrift.PrependError(fmt.Sprintf("%T read field %d '%s' error: ", p, fieldId, fieldIDToName_Identity[fieldId]), err)
SkipFieldError:
	return thrift.PrependError(fmt.Sprintf("%T field %d skip type %d error: ", p, fieldId, fieldTypeId), err)

ReadFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T read field end error", p), err)
ReadStructEndError:
	return thrift.PrependError(fmt.Sprintf("%T read struct end error: ", p), err)
RequiredFieldNotSetError:
	return thrift.NewTProtocolExceptionWithType(thrift.INVALID_DATA, fmt.Errorf("required field %s is not set", fieldIDToName_Identity[fieldId]))
}

func (p *Identity) ReadField1(iprot thrift.TProtocol) error {
	if v, err := iprot.ReadString(); err != nil {
		return err
	} else {
		p.LicNumber = v
	}
	return nil
}

func (p *Identity) ReadField2(iprot thrift.TProtocol) error {
	if v, err := iprot.ReadString(); err != nil {
		return err
	} else {
		p.Name = v
	}
	return nil
}

func (p *Identity) ReadField3(iprot thrift.TProtocol) error {
	if v, err := iprot.ReadI32(); err != nil {
		return err
	} else {
		p.Gender = Gender(v)
	}
	return nil
}

func (p *Identity) ReadField4(iprot thrift.TProtocol) error {
	if v, err := iprot.ReadI64(); err != nil {
		return err
	} else {
		p.BirthDateMillis = v
	}
	return nil
}

func (p *Identity) Write(oprot thrift.TProtocol) (err error) {
	var fieldId int16
	if err = oprot.WriteStructBegin("Identity"); err != nil {
		goto WriteStructBeginError
	}
	if p != nil {
		if err = p.writeField1(oprot); err != nil {
			fieldId = 1
			goto WriteFieldError
		}
		if err = p.writeField2(oprot); err != nil {
			fieldId = 2
			goto WriteFieldError
		}
		if err = p.writeField3(oprot); err != nil {
			fieldId = 3
			goto WriteFieldError
		}
		if err = p.writeField4(oprot); err != nil {
			fieldId = 4
			goto WriteFieldError
		}

	}
	if err = oprot.WriteFieldStop(); err != nil {
		goto WriteFieldStopError
	}
	if err = oprot.WriteStructEnd(); err != nil {
		goto WriteStructEndError
	}
	return nil
WriteStructBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write struct begin error: ", p), err)
WriteFieldError:
	return thrift.PrependError(fmt.Sprintf("%T write field %d error: ", p, fieldId), err)
WriteFieldStopError:
	return thrift.PrependError(fmt.Sprintf("%T write field stop error: ", p), err)
WriteStructEndError:
	return thrift.PrependError(fmt.Sprintf("%T write struct end error: ", p), err)
}

func (p *Identity) writeField1(oprot thrift.TProtocol) (err error) {
	if err = oprot.WriteFieldBegin("lic_number", thrift.STRING, 1); err != nil {
		goto WriteFieldBeginError
	}
	if err := oprot.WriteString(p.LicNumber); err != nil {
		return err
	}
	if err = oprot.WriteFieldEnd(); err != nil {
		goto WriteFieldEndError
	}
	return nil
WriteFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write field 1 begin error: ", p), err)
WriteFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T write field 1 end error: ", p), err)
}

func (p *Identity) writeField2(oprot thrift.TProtocol) (err error) {
	if err = oprot.WriteFieldBegin("name", thrift.STRING, 2); err != nil {
		goto WriteFieldBeginError
	}
	if err := oprot.WriteString(p.Name); err != nil {
		return err
	}
	if err = oprot.WriteFieldEnd(); err != nil {
		goto WriteFieldEndError
	}
	return nil
WriteFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write field 2 begin error: ", p), err)
WriteFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T write field 2 end error: ", p), err)
}

func (p *Identity) writeField3(oprot thrift.TProtocol) (err error) {
	if err = oprot.WriteFieldBegin("gender", thrift.I32, 3); err != nil {
		goto WriteFieldBeginError
	}
	if err := oprot.WriteI32(int32(p.Gender)); err != nil {
		return err
	}
	if err = oprot.WriteFieldEnd(); err != nil {
		goto WriteFieldEndError
	}
	return nil
WriteFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write field 3 begin error: ", p), err)
WriteFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T write field 3 end error: ", p), err)
}

func (p *Identity) writeField4(oprot thrift.TProtocol) (err error) {
	if err = oprot.WriteFieldBegin("birth_date_millis", thrift.I64, 4); err != nil {
		goto WriteFieldBeginError
	}
	if err := oprot.WriteI64(p.BirthDateMillis); err != nil {
		return err
	}
	if err = oprot.WriteFieldEnd(); err != nil {
		goto WriteFieldEndError
	}
	return nil
WriteFieldBeginError:
	return thrift.PrependError(fmt.Sprintf("%T write field 4 begin error: ", p), err)
WriteFieldEndError:
	return thrift.PrependError(fmt.Sprintf("%T write field 4 end error: ", p), err)
}

func (p *Identity) String() string {
	if p == nil {
		return "<nil>"
	}
	return fmt.Sprintf("Identity(%+v)", *p)
}
